# Installation

## 1. Install Dependencies

Install Bootstrap and the `ccnextgen-layout` library.

**Option A (recommended):**

```bash
npm install bootstrap ccnextgen-layout
ng add ccnextgen-layout
```

**Option B:**

```bash
npm install bootstrap
ng add ccnextgen-layout
```

---

## 2. Import Components

In `app.component.ts` (or `app.ts`):

```ts
import { CCNextGenBaseLayout, LoadingComponent } from 'ccnextgen-layout';
```

---

## 3. Add Layout Components

In `app.component.html` (or `app.html`):

```html
<ccnextgen-loading></ccnextgen-loading>
<ccnextgen-layout></ccnextgen-layout>
```

---

# Notes

Many components allow custom templates to be passed in.

To define a custom template:

```html
<ng-template #myTemplate>
  <!-- custom content -->
</ng-template>
```

Any component with an `@Input()` of type `TemplateRef<any>` can reference this template using the template name **without** the `#`.

---

# Layout Component

## TypeScript Setup

```ts
import { CCNextGenBaseLayout } from 'ccnextgen-layout';

@Component({
  imports: [CCNextGenBaseLayout]
})
export class AppComponent {}
```

---

## Layout Inputs

| Option            | Type                         | Required | Description                           |
| ----------------- | ---------------------------- | -------- | ------------------------------------- |
| sidebarTemplate   | `TemplateRef<any>`           | No       | Custom sidebar template               |
| topbarTemplate    | `TemplateRef<any>`           | No       | Custom topbar template                |
| sidebarBeforeMenu | `TemplateRef<any>`           | No       | Content before the sidebar menu       |
| sidebarAfterMenu  | `TemplateRef<any>`           | No       | Content after the sidebar menu        |
| containerFluid    | boolean                      | No       | Removes margins from the content area |
| sidebarItems      | `SidebarItem[]` | `object[]` | No       | Sidebar menu configuration            |
| isHR              | boolean                      | No       | Renders a menu item as `<hr />`       |

---

## HTML Usage

```html
<ccnextgen-layout [sidebarItems]="links"></ccnextgen-layout>
```

---

## Defining Sidebar Links

```ts
links = [
  { title: 'Home', route: '/', icon: 'home' },
  { title: 'Help', route: '/help', icon: 'help' },
  { title: 'Editor', route: '/edit', icon: 'edit' }
];
```

---

### SidebarItem Fields

| Field | Type    | Required | Description                   |
| ----- | ------- | -------- | ----------------------------- |
| title | string  | Yes*     | Text displayed in the sidebar |
| route | string  | Yes*     | Route to navigate to          |
| icon  | string  | No*      | Material icon name            |
| isHR  | boolean | No       | Renders item as a divider     |

* If `isHR` is `true`, other fields are not required.

---

# Loading Component

Displays a logo and loading indicator.

## TypeScript

```ts
import { LoadingComponent } from 'ccnextgen-layout';

@Component({
  imports: [LoadingComponent]
})
export class AppComponent {}
```

## HTML

```html
<ccnextgen-loading></ccnextgen-loading>
```

---

## Inputs

| Option     | Type    | Required | Description                         |
| ---------- | ------- | -------- | ----------------------------------- |
| message    | string  | No       | Overrides default "Loading..." text |
| fullScreen | boolean | No       | Displays fullscreen                 |
| modal      | boolean | No       | Displays as a modal overlay         |
| logo       | string  | No       | Custom logo path                    |

---

# Search Component

Provides a search input with submit and clear behavior.

## TypeScript

```ts
import { SearchBox } from 'ccnextgen-layout';

@Component({
  imports: [SearchBox]
})
export class AppComponent {}
```

## HTML

```html
<ccnextgen-search
  [search]="'initial value'"
  (searchEvent)="onSearch($event)">
</ccnextgen-search>
```

---

## Inputs / Outputs

| Option      | Type                           | Required | Description                              |
| ----------- | ------------------------------ | -------- | ---------------------------------------- |
| search      | string                         | No       | Initial search value                     |
| searchEvent | `EventEmitter<string \| null>` | Yes      | Emits value on submit or `null` on clear |

---

# Page Header Component

Displays a page header with optional action buttons.

## TypeScript

```ts
import { PageHeader } from 'ccnextgen-layout';

@Component({
  imports: [PageHeader]
})
export class AppComponent {}
```

## HTML

```html
<ccnextgen-header
  [titleLinkUrl]="'/dashboard'"
  [buttons]="[
    { icon: 'plus', route: '/create', title: 'New Item', color: 'primary' },
    { icon: 'edit', route: '/edit', title: 'Edit', color: 'secondary', colorAsOutline: true }
  ]">
</ccnextgen-header>
```

---

## Header Inputs

| Option       | Type                         | Required | Description              |
| ------------ | ---------------------------- | -------- | ------------------------ |
| titleLinkUrl | string                       | No       | URL for title navigation |
| buttons      | `ButtonModel[]` | `object[]` | No       | Action buttons           |

---

## Button Object Format

| Option         | Type    | Required | Description        |
| -------------- | ------- | -------- | ------------------ |
| icon           | string  | No       | Material icon name |
| route          | string  | Yes      | Navigation route   |
| title          | string  | Yes      | Button label       |
| color          | string  | No       | Bootstrap color    |
| colorAsOutline | boolean | No       | Use outline style  |
| showButton     | boolean | No       | Toggle visibility  |

---

# Dashboard Links Component

Displays dashboard-style navigation buttons.

## TypeScript

```ts
import { DashboardLinks } from 'ccnextgen-layout';

@Component({
  imports: [DashboardLinks]
})
export class AppComponent {}
```

## HTML

```html
<ccnextgen-dashboard-links
  [buttons]="[
    { icon: 'home', route: '/home', title: 'Home' },
    { icon: 'settings', route: '/settings', title: 'Settings', onclick: customClickHandler }
  ]">
</ccnextgen-dashboard-links>
```

---

## Inputs

| Option  | Type                                | Required | Description                |
| ------- | ----------------------------------- | -------- | -------------------------- |
| buttons | `DashboardLinkModel[]` | `object[]` | No       | Dashboard link definitions |

---

## Dashboard Button Object Format

| Property   | Type     | Required | Description          |
| ---------- | -------- | -------- | -------------------- |
| icon       | string   | Yes      | Icon name            |
| route      | string   | Yes      | Navigation route     |
| title      | string   | Yes      | Display label        |
| onclick    | delegate | No       | Custom click handler |
| showButton | boolean  | No       | Visibility toggle    |

---

# CRUD Buttons Component

Renders Edit, Delete, and Details buttons.

## TypeScript

```ts
import { CrudButtons } from 'ccnextgen-layout';

@Component({
  imports: [CrudButtons]
})
export class AppComponent {}
```

## HTML

```html
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
  (detailsAction)="onDetails($event)">
</ccnextgen-crud-buttons>
```

---

## Inputs

| Option           | Type                             | Required | Description          |
| ---------------- | -------------------------------- | -------- | -------------------- |
| itemId           | `string \| number`               | Yes      | Target item ID       |
| showEdit         | boolean                          | No       | Show Edit button     |
| showDelete       | boolean                          | No       | Show Delete button   |
| showDetails      | boolean                          | No       | Show Details button  |
| editUrl          | string | null                    | No       | Edit route           |
| deleteUrl        | string | null                    | No       | Delete route         |
| detailsUrl       | string | null                    | No       | Details route        |
| buttonSize       | `'small' \| 'medium' \| 'large'` | No       | Button size          |
| buttonsAsOutline | boolean                          | No       | Outline style        |
| deleteWarning    | string                           | No       | Confirmation message |

---

## Outputs

| Event         | Type                             | Description      |
| ------------- | -------------------------------- | ---------------- |
| editAction    | `EventEmitter<string \| number>` | Edit clicked     |
| deleteAction  | `EventEmitter<string \| number>` | Delete confirmed |
| detailsAction | `EventEmitter<string \| number>` | Details clicked  |

---

# App Error Component

Displays application-level error screens.

> **Note:**
> When used at the root level, set `fullscreen` or `modal` to `true`.

## TypeScript

```ts
import { AppErrorComponent } from 'ccnextgen-layout';

@Component({
  imports: [AppErrorComponent]
})
export class AppComponent {}
```

## HTML

```html
<ccnextgen-app-error
  [message]="'The page you are looking for does not exist.'"
  [title]="'Page Not Found'"
  [error]="'404'"
  [fullscreen]="true"
  [logo]="'assets/ccnextgen-logo.png'"
  [modal]="false"
  [hideLogo]="false"
  [goToPage]="'/'"
  goToPageName="home page">
</ccnextgen-app-error>
```

---

## Inputs

| Option       | Type                                      | Required | Default       | Description          |
| ------------ | ----------------------------------------- | -------- | ------------- | -------------------- |
| message      | string                                    | No       | `''`          | Error message        |
| title        | string                                    | No       | `'Error'`     | Title text           |
| error        | `404 \| 403 \| invalid-user \| 500 \| ''` | No       | `''`          | Preset error type    |
| errorCode    | number | null                             | No       | `500`         | Displayed error code |
| fullscreen   | boolean                                   | No       | `false`       | Fullscreen mode      |
| modal        | boolean                                   | No       | `false`       | Modal overlay        |
| logo         | string                                    | No       | default logo  | Logo image           |
| hideLogo     | boolean                                   | No       | `false`       | Hide logo            |
| goToPage     | string                                    | No       | `'/'`         | Navigation route     |
| goToPageName | string                                    | No       | `'home page'` | Link label           |

---

# Permitted Color Value Strings

| Color     | Description                   |
| --------- | ----------------------------- |
| default   | Alias for `primary`           |
| primary   | Blue (`btn-primary`)          |
| success   | Green (`btn-success`)         |
| danger    | Red (`btn-danger`)            |
| warning   | Yellow/Orange (`btn-warning`) |
| secondary | Gray (`btn-secondary`)        |