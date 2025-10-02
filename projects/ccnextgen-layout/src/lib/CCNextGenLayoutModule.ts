import { NgModule } from "@angular/core";

import { DashboardLinks } from "./dashboard-links/dashboard-links.component";
import { SearchBox } from "./search/search.component";
import { CrudButtons } from "./crud-buttons/crud-buttons.component";
import { PageHeader } from "./page-header/page-header.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CCNextGenBaseLayout } from "./layout/layout.component";

@NgModule({
    imports: [CCNextGenBaseLayout, SidebarComponent, TopbarComponent, PageHeader, CrudButtons, SearchBox, DashboardLinks],
    exports: [CCNextGenBaseLayout, SidebarComponent, TopbarComponent, PageHeader, CrudButtons, SearchBox, DashboardLinks]
})

export class CCNextGenLayoutModule {}