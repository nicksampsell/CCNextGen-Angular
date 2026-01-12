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

# Form Error Component

Displays validation error messages for Angular reactive form controls with support for custom messages and automatic handling of common validators.

---

## TypeScript

```ts
import { FormError } from './form-error.component';

@Component({
  imports: [FormError]
})
export class AppComponent {}
```

> This component is **standalone** and can be imported directly without a module.

---

## HTML Usage

```html
<input
  type="email"
  class="form-control"
  [formControl]="emailControl">

<form-error
  [control]="emailControl">
</form-error>
```

---

## Inputs

| Option       | Type                        | Required | Default                      | Description                                  |
| ------------ | --------------------------- | -------- | ---------------------------- | -------------------------------------------- |
| control      | `AbstractControl \| null`   | Yes      | —                            | Form control to watch for validation errors  |
| customErrors | `{ [key: string]: string }` | No       | `{}`                         | Custom error messages by validator key       |
| wrapperTag   | `string \| null`            | No       | `null`                       | Optional HTML tag wrapping the error message |
| wrapperClass | `string`                    | No       | `'invalid-feedback d-block'` | CSS classes applied to the error container   |

---

## Default Validation Messages

The component automatically provides fallback messages for common Angular validators:

| Validator   | Default Message                   |
| ----------- | --------------------------------- |
| `required`  | `This field is required.`         |
| `minlength` | `Minimum length is X characters.` |
| `maxlength` | `Maximum length is X characters.` |
| `email`     | `Invalid email format.`           |
| `pattern`   | `Invalid format.`                 |

Messages are shown **only when the control is invalid and has been touched or dirtied**.

---

## Custom Error Messages Example

```html
<form-error
  [control]="passwordControl"
  [customErrors]="{
    required: 'Password is mandatory',
    minlength: 'Password must be at least 8 characters long'
  }">
</form-error>
```

> Custom messages **override default messages** when provided.

---

## Wrapper Tag Example

```html
<form-error
  [control]="usernameControl"
  wrapperTag="div"
  wrapperClass="text-danger mt-1">
</form-error>
```

---

# Theme Service

Provides application-wide Bootstrap theme switching (`light`, `dark`, or `auto`) using `data-bs-theme` and persists the preference in `localStorage`.

---

## Theme Type

```ts
export type Theme = 'light' | 'dark' | 'auto';
```

---

## Usage

### Injecting the Service

```ts
import { ThemeService } from './theme.service';

@Component({})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}
}
```

---

### Switching Themes

```ts
this.themeService.setTheme('dark');
this.themeService.setTheme('light');
this.themeService.setTheme('auto');
```

---

## Behavior

* Automatically applies the stored theme on app startup
* Listens for OS-level color scheme changes when theme is set to `auto`
* Uses Bootstrap’s `data-bs-theme` attribute on the `<html>` element
* Stores user preference in `localStorage` under the key `theme`

---

## Methods

| Method                  | Return Type     | Description                                       |
| ----------------------- | --------------- | ------------------------------------------------- |
| `getStoredTheme()`      | `Theme \| null` | Returns the theme stored in `localStorage`        |
| `setStoredTheme(theme)` | `void`          | Saves theme preference                            |
| `getPreferredTheme()`   | `Theme`         | Determines the effective theme (stored or system) |
| `applyTheme(theme)`     | `void`          | Applies theme to the document                     |
| `setTheme(theme)`       | `void`          | Stores and applies theme                          |

---

## Example: Theme Toggle Buttons

```html
<button class="btn btn-light" (click)="themeService.setTheme('light')">
  Light
</button>

<button class="btn btn-dark" (click)="themeService.setTheme('dark')">
  Dark
</button>

<button class="btn btn-secondary" (click)="themeService.setTheme('auto')">
  Auto
</button>
```


---

## Notes

* Requires **Bootstrap 5.3+** for `data-bs-theme` support
* Works seamlessly with system dark mode preferences
* No additional CSS or configuration required

# Permitted Color Value Strings

| Color     | Description                   |
| --------- | ----------------------------- |
| default   | Alias for `primary`           |
| primary   | Blue (`btn-primary`)          |
| success   | Green (`btn-success`)         |
| danger    | Red (`btn-danger`)            |
| warning   | Yellow/Orange (`btn-warning`) |
| secondary | Gray (`btn-secondary`)        |

Below is **documentation written in the same style and structure** as your existing `ccnextgen-layout` docs, ready to be appended to the same documentation file.

