import { Rule, Tree, chain, SchematicContext, SchematicsException, } from '@angular-devkit/schematics';
import { workspaces, virtualFs } from '@angular-devkit/core';
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
    const buffer = tree.read(path);
    if (!buffer) {
      context.logger.warn(`Could not find ${path}. Please add the provider manually.`);
      return tree;
    }

    let content = buffer.toString();

    // Add import if missing
    if (!content.includes("provideCCNextGenLayout")) {
      content = `import { provideCCNextGenLayout } from 'ccnextgen-layout';\n${content}`;
    }

    const providerText = `provideCCNextGenLayout({ appTitle: '${options.appTitle ?? 'My App'}', logoUrl: '${options.logo ?? '/assets/logo.png'}' })`;

    // Check if provider already exists
    const duplicate = content.includes(providerText);
    if (!duplicate) {
      // Append provider inside providers array
      const updatedContent = content.replace(
        /providers:\s*\[(.*?)\]/s,
        (_, existing) => `providers: [${existing.trim()}, ${providerText}]`
      );

      tree.overwrite(path, updatedContent);
      context.logger.info(`Added CCNextGenLayoutConfig with title: ${options.appTitle} and logo: ${options.logo}`);
    } else {
      context.logger.info(`CCNextGenLayoutConfig provider already exists in ${path}`);
    }

    return tree;
  };
}




export function ngAdd(options: AppSchema): Rule {
  return chain([
    updateAngularJson(),
    addLayoutConfig(options)
    // ...other rules if needed
  ]);
}