import { Component, Input, OnChanges, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../sidebar/sidebar.model';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardLinkModel } from './dashboard-link.model';


@Component({
    selector: 'ccnextgen-dashboard-links',
    templateUrl: './dashboard-links.component.html',
    styleUrl: './dashboard-links.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule],
    encapsulation: ViewEncapsulation.None
})
export class DashboardLinks {

    private _dashboardLinks: DashboardLinkModel[] = [];


    @Input() set buttons(items: (DashboardLinkModel | {
        icon:string;
        route:string;
        title:string;
        onclick?:(() => void);
        showButton?:boolean })[]) {
        this._dashboardLinks = items.map(item =>
            item instanceof DashboardLinkModel
            ? item
            : new DashboardLinkModel(item.icon, item.route, item.title, item.showButton ?? true, item.onclick)
        );
    }

    constructor(private router:Router) {}


    get getDashboardLinks(): DashboardLinkModel[] {
        return this._dashboardLinks;
    }
    
    handleClick(event:MouseEvent, link:DashboardLinkModel)
    {
        event.preventDefault();
        if(link.onclick)
        {
            link.onclick();
        }

        this.router.navigate([link.route]);
    }
}