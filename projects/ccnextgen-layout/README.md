# Installation

1. Download library
`npm install ccnextgen-layout`
2. In app.config.ts, add the following to providers:
```{
provide: CCNEXTGEN_LAYOUT_CONFIG,
    useValue: {
        appTitle: 'Surplus Management',
        logo: '/path/to/logo' //(optional)
    }
}
```
3. In angular.json, add the following items to the build configuration

```
assets: [
	{
		"glob": "**/*",
		"input": "node_modules/ccnextgen-layout/src/assets",
		"output": "/assets/ccnextgen-layout"
	}
],
"styles": [
	"node_modules/bootstrap/dist/css/bootstrap.min.css",
	"[YOUR APP]/src/styles.css"
],
"scripts": [
	"node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

5. In app.component.ts (or app.ts) import the library
```
import { CCNextGenBaseLayout, LoadingComponent } from  'ccnextgen-layout'
```
6. In the app.component.html (or app.html), add the layout component tags
```
<ccnextgen-loading></ccnextgen-loading>
<ccnextgen-layout></ccnextgen-layout>
```
# Notes
Many of the components allow you to pass in custom templates.  To do this, add a `<ng-template #YOUR_TEMPLATE_NAME></ng-template>` tag with your content inside.  Any component with an Input() type of `TemplateRef<Any>` can access this template by referencing the #YOUR_TEMPLATE_NAME (without the #)
# Layout

## .TS File
`import { CCNextGenBaseLayout } from  'ccnextgen-layout'`
```
@Component({
	imports: [CCNextGenBaseLayout]
});
```

| Option | Type | Required | Description |
|--|--|--|--|
| sidebarTemplate | `TemplateRef<any>` | No | Allows you to set a custom sidebar template |
| topbarTemplate | `TemplateRef<any>` | no | Allows you to set a custom topbar template` |
| sidebarBeforeMenu | `TemplateRef<any>` | no | Allows you to set a custom template that appears before the menu in the sidebar. |
| sidebarAfterMenu | `TemplateRef<any>` | no | Allows you to set a custom template that appears after the menu in the sidebar. |
| containerFluid | boolean | no | Remove margins from content area of layout |
| sidebarItems | `SidebarItem[]` OR `object[]` | no | Defines sidebar menu items. (See example below)
| isHR | boolean | no | Changes the menu item to a `<hr />` tag.

## HTML
```<ccnextgen-layout [sidebarItems]="links"></ccnextgen-layout>```

## .TS File (Define links)

```
buttons  = [{
	title: 'Home',
	route: '/',
	icon: 'home',
},
{
	title: 'Help',
	route: '/help',
	icon: 'help',
},
{
	title: 'Editor',
	route: '/edit',
	icon: 'edit',
}]
```


### SidebarItem fields:
| Field | Type | Required | Description |
| -- | -- | -- | -- |
title | string | yes* | The text to display in the sidebar link.
route | string | yes* | The route the link should navigate to.
icon | string | no* | The Material icon name to display next to the link text.
isHR | boolean | no | If `true`, this item renders as a horizontal divider (`<hr />`).*If you set the isHR field to true, the other fields are not required.


# Loading Component
This component displays the logo and a loading indicator.

## .TS File
`import { LoadingComponent} from  'ccnextgen-layout'`
```
@Component({
	imports: [LoadingComponent]
});
```

## .HTML
`<ccnextgen-loading></ccnextgen-loading>`

| Option | Type | Required | Description |
|--|--|--|--|
| message | string | no | override the "Loading..." message
| fullScreen | boolean | no | set the modal to fullscreen (otherwise it displays as an inline block)
| modal | boolean | no | set the modal to act as a modal. (Items below it are blurred and unselectable)
| logo | string | no | override the logo.  If no logo is provided, it uses the default logo (or one set in app.config.ts)

# Search Component
This component provides a search input with optional pre-filled value, a clear button, and an output event emitter for search submissions.

`import { SearchBox } from 'ccnextgen-layout';`
```
@Component({
  imports: [SearchBox]
});
```
## .HTML File
``<ccnextgen-search [search]="'initial value'" (searchEvent)="onSearch($event)"></ccnextgen-search>``

| Option | Type | Required | Description |
| -- | -- | -- | -- |
|search | string | no | Sets the initial search input value.
| searchEvent | `EventEmitter<string | null>` | yes | Emits the search value on submit, or null when cleared |

# Page Header Component
This component displays a customizable page header with a title link and configurable action buttons.

## .TS File
`import { PageHeader } from 'ccnextgen-layout';`

```
@Component({
  imports: [PageHeader]
});
```

## .HTML
```
<ccnextgen-header
  [titleLinkUrl]="'/dashboard'"
  [buttons]="[
    { icon: 'plus', route: '/create', title: 'New Item', color: 'primary' },
    { icon: 'edit', route: '/edit', title: 'Edit', color: 'secondary', colorAsOutline: true }
  ]"
></ccnextgen-header>
```

(Buttons can also be defined as a variable like in the BaseLayout example above)

## Inputs
| Option | Type | Required | Description |
| -- | -- | -- | -- |
| titleLinkUrl | string | no | Optional URL to navigate to when clicking the header title |
| buttons | `ButtonModel[]` or `object[]`

## Button Object Format
If you are passing plain objects to the buttons input, they should follow this structure:
| Option | Type | Required | Description |
| -- | -- | -- | -- |
| icon | string | no | Material Icons name for button |
| route | string | yes | Route to navigate to when button is clicked
| title | string | yes | Text label for the button |
| color | (color value string) | no | Sets the color for the button using Bootstrap's naming conventions (see below)
| colorAsOutline | boolean | no | Whether the button should use the outline style option from Bootstrap (default: `false`) |
| showButton | boolean | no | Controls whether the button is shown. (default: `true`)






# Dashboard Links Component
This component renders a list of interactive dashboard-style link buttons, each with an icon, title, route, and optional click handler.
## .TS File
`import { DashboardLinks } from 'ccnextgen-layout';`
```
@Component({
  imports: [DashboardLinks]
});
```

## .HTML

```
<ccnextgen-dashboard-links
  [buttons]="[
    { icon: 'home', route: '/home', title: 'Home' },
    { icon: 'settings', route: '/settings', title: 'Settings', onclick: customClickHandler }
  ]"></ccnextgen-dashboard-links>
```

## Inputs
| Option | Type | Required | Description |
| -- | -- | -- | -- |
| buttons | `DashboardLinkModel[]` or `object[]` | no | Array of dashboard links.  can be model isntances or plain objects.

## Dashboard Button Object Format
If passing plain objects to buttons, use the following structure:
| Property| Type | Required | Description |
| -- | -- | -- | -- |
| icon| string|yes|Icon name for the dashboard link.
|route| string|yes|Route to navigate to on click.
|title| string|yes|Label shown for the link.
|onclick|delegate|no |Optional custom click handler. Called before navigation.
|showButton | boolean | no | Determines visibility of the button (default: `true`).

# CRUD Buttons Component
This component renders configurable Edit, Delete, and Details buttons for a given item. Each button can emit events and optionally navigate to a specified route.

## .TS File
`import { CrudButtons } from 'ccnextgen-layout';`
```
@Component({
  imports: [CrudButtons]
});
```
## .HTML
```
<ccnextgen-crud-buttons
  [itemId]="item.id"
  [editUrl]="'/items/edit'"
  [deleteUrl]="'/items/delete'"
  [detailsUrl]="'/items/details'"
  [editColor]="'primary'"
  [deleteColor]="'danger'"
  [detailsColor]="'info'"
  [buttonsAsOutline]="true"
  (editAction)="onEdit($event)"
  (deleteAction)="onDelete($event)"
  (detailsAction)="onDetails($event)"
></ccnextgen-crud-buttons>
```
| Option| Type | Required | Description |
| -- | -- | -- | -- |
itemId | `string | number` |yes | The ID of the item the buttons operate on.
showEdit | boolean | no | Show or hide the Edit button (default: `true`).
showDelete | boolean | no | Show or hide the Delete button (default: `true`).
showDetails | boolean | no | Show or hide the Details button (default: `true`).
editUrl | string / null | no | Route to navigate to on Edit click (default: `'edit'`).
deleteUrl | string / null | no | Route to navigate to on Delete click (default: `'delete'`).
detailsUrl |  string /  null | no | Route to navigate to on Details click (default: `'details'`).
buttonSize | 'small'/ 'medium' / 'large' | no | Size of the buttons (default: `'medium'`).
editColor | Bootstrap color string (see Permitted Color Value Strings) | no | Button color for Edit (default: `'primary'`).
deleteColor  | Bootstrap color string (see Permitted Color Value Strings) | no | Button color for Delete (default: `'danger'`).
detailsColor | Bootstrap color string (see Permitted Color Value Strings)| no | Button color for Details (default: `'info'`).
buttonsAsOutline | boolean | no | Display buttons with outline style (default: `false`).
deleteWarning | string | no | Custom confirmation message before delete (default: `"Are you sure..."`).

## Outputs
| Event| Type | Description |
| -- | -- | -- |
editAction | `EventEmitter<string | number>` | Emitted when the Edit button is clicked.
deleteAction | `EventEmitter<string | number>` | Emitted after delete confirmation and Delete button click.
detailsAction | `EventEmitter<string | number>` | Emitted when the Details button is clicked.


# Permitted Color Value Strings
Color String | Description 
| -- | -- |
| default | Alias for `primary` |
| primary | Blue button with white text.  (btn-primary)
| success | Green button with white text. (btn-success)
| danger | Red button with white text. (btn-danger)
| warning | Yellow/Orange button (btn-warning)
| secondary | Grey button with black text (btn-secondary)
