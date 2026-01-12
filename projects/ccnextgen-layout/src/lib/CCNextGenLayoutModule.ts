import { NgModule } from "@angular/core";

import { DashboardLinks } from "./dashboard-links/dashboard-links.component";
import { SearchBox } from "./search/search.component";
import { CrudButtons } from "./crud-buttons/crud-buttons.component";
import { PageHeader } from "./page-header/page-header.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CCNextGenBaseLayout } from "./layout/layout.component";
import { ThemeService } from "./theme-switcher/theme.service";
import { ThemeSwitcher } from "./theme-switcher/theme-switcher.component";
import { FormError } from "./form-error/form-error.component";

@NgModule({
    imports: [CCNextGenBaseLayout, SidebarComponent, TopbarComponent, PageHeader, CrudButtons, SearchBox, DashboardLinks, ThemeSwitcher, FormError],
    exports: [CCNextGenBaseLayout, SidebarComponent, TopbarComponent, PageHeader, CrudButtons, SearchBox, DashboardLinks, ThemeSwitcher, FormError]
})

export class CCNextGenLayoutModule {}