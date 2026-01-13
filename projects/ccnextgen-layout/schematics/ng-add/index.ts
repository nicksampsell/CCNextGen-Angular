import { Rule, Tree, chain, SchematicContext, SchematicsException, } from '@angular-devkit/schematics';
import { workspaces, virtualFs } from '@angular-devkit/core';
import * as ts from 'typescript';
import { AppSchema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) throw new SchematicsException(`File ${path} not found`);

      const buffer = new Uint8Array(data).buffer;
      return virtualFs.fileBufferToString(buffer);
    },
    async writeFile(path: string, data: string): Promise<void> {
      if (tree.exists(path)) {
        tree.overwrite(path, data);
      } else {
        tree.create(path, data);
      }
    },
    async isDirectory(path: string): Promise<boolean> {
      const dir = tree.getDir(path);
      return dir.subfiles.length > 0 || dir.subdirs.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    }
  };
}


export function updateAngularJson(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    const defaultProject = workspace.extensions.defaultProject?.toString() ?? Array.from(workspace.projects.keys())[0];

    if (!defaultProject) {
      context.logger.warn('No default project found');
      return tree;
    }

    if (!defaultProject) {
      context.logger.warn('No default project found');
      return tree;
    }

    const project = workspace.projects.get(defaultProject);
    if (!project) throw new SchematicsException(`Project ${defaultProject} not found`);

    const build = project.targets.get('build');
    if (!build || !build.options) {
      context.logger.warn(`No build target found for ${defaultProject}`);
      return tree;
    }

    // --- Add to styles ---
    const styles = (build.options['styles'] as (string | { input: string })[]) ?? [];
    const bootstrapStyle = 'node_modules/bootstrap/dist/css/bootstrap.min.css';

    if (!styles.includes(bootstrapStyle)) {
      styles.push(bootstrapStyle);
      build.options['styles'] = styles;
      context.logger.info(`Added style: ${bootstrapStyle}`);
    } else {
      context.logger.info(`Style already present: ${bootstrapStyle}`);
    }

    const scripts = (build.options['scripts'] as (string | { input: string })[]) ?? [];
    const bootstrapJS = 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

    if(!scripts.includes(bootstrapJS)) {
        scripts.push(bootstrapJS);
        build.options['scripts'] = scripts;
        context.logger.info(`Added JS: ${bootstrapJS}`);
    } else {
      context.logger.info(`JS already present: ${bootstrapJS}`);
    }

    const assets = (build.options['assets'] as any[]) ?? [];
    const layoutAssets = {
      glob: '**/*',
      input: 'node_modules/ccnextgen-layout/src/assets',
      output: '/assets/ccnextgen-layout'
    };

    // Check if the asset is already present
    const exists = assets.some(a => 
      typeof a === 'object' &&
      a.input === layoutAssets.input &&
      a.output === layoutAssets.output &&
      a.glob === layoutAssets.glob
    );

    if (!exists) {
      assets.push(layoutAssets);
      build.options['assets'] = assets;
      context.logger.info(`Added assets: ${layoutAssets.input}`);
    } else {
      context.logger.info(`Assets already present: ${layoutAssets.input}`);
    }


    await workspaces.writeWorkspace(workspace, host);
    context.logger.info('angular.json updated');
    return tree;
  };
}

export function addLayoutConfig(options: AppSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const path = options.appConfigPath ?? 'src/app/app.config.ts';

    if (!tree.exists(path)) {
      context.logger.warn(`Could not find ${path}. Please add the provider manually.`);
      return tree;
    }

    const fileContent = tree.read(path)?.toString();
    if (!fileContent) {
      context.logger.warn(`Could not read ${path}`);
      return tree;
    }

    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const layoutProviderText = `provideCCNextGenLayout({ appTitle: '${options.appTitle ?? 'My App'}' })`;

    // Check if the import already exists
    const hasImport = fileContent.includes('provideCCNextGenLayout');
    let updatedSource = fileContent;

    if (!hasImport) {
      updatedSource = `import { provideCCNextGenLayout } from 'ccnextgen-layout';\n${updatedSource}`;
    }

    const tempSourceFile = ts.createSourceFile(path, updatedSource, ts.ScriptTarget.Latest, true);

    // Visit AST and find providers array
const transformer: ts.TransformerFactory<ts.SourceFile> =
  (innerContext: ts.TransformationContext) => {

    return (rootNode: ts.SourceFile): ts.SourceFile => {

      const visit = (node: ts.Node): ts.Node => {

        if (
          ts.isPropertyAssignment(node) &&
          ts.isIdentifier(node.name) &&
          node.name.text === 'providers' &&
          ts.isArrayLiteralExpression(node.initializer)
        ) {
          const arrayLiteral = node.initializer;

          const alreadyPresent = arrayLiteral.elements.some(el =>
            el.getText().includes('provideCCNextGenLayout')
          );

          if (alreadyPresent) {
            context.logger.info(
              'provideCCNextGenLayout already present in providers.'
            );
            return node;
          }

          const newProviderNode = ts.factory.createIdentifier(layoutProviderText);

          return ts.factory.updatePropertyAssignment(
            node,
            node.name,
            ts.factory.updateArrayLiteralExpression(
              arrayLiteral,
              ts.factory.createNodeArray([
                ...arrayLiteral.elements,
                newProviderNode
              ])
            )
          );
        }

        return ts.visitEachChild(node, visit, innerContext);
      };

      return ts.visitNode(rootNode, visit) as ts.SourceFile;
    };
  };

    const transformedResult = ts.transform(tempSourceFile, [transformer]);
    const transformedSourceFile = transformedResult.transformed[0];
    const newContent = printer.printFile(transformedSourceFile as ts.SourceFile);

    tree.overwrite(path, newContent);
    context.logger.info(`✅ Added provideCCNextGenLayout to providers in ${path}`);
    return tree;
  };
}

export function updateGlobalStyles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const path = 'src/styles.css';

    if (!tree.exists(path)) {
      context.logger.warn(`Could not find ${path}. Skipping global style addition.`);
      return tree;
    }

    const buffer = tree.read(path);
    if (!buffer) {
      context.logger.warn(`Could not read ${path}.`);
      return tree;
    }

    let content = buffer.toString();

    const styleToAdd = `
/* You can add global styles to this file, and also import other style files */
app-root, ccnextgen-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
`.trim();

    // Avoid adding duplicate styles
    if (!content.includes('ccnextgen-layout')) {
      content = `${styleToAdd}\n\n${content}`;
      tree.overwrite(path, content);
      context.logger.info(`Updated ${path} with global layout styles.`);
    } else {
      context.logger.info(`${path} already contains layout styles.`);
    }

    return tree;
  };
}





export function ngAdd(options: AppSchema): Rule {
  return chain([
    updateAngularJson(),
    addLayoutConfig(options),
    updateGlobalStyles()
    // ...other rules if needed
  ]);
}

export default ngAdd;