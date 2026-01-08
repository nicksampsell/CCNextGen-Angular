import { AfterViewInit, Component, Input, OnChanges, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../sidebar/sidebar.model';
import { RouterOutlet } from '@angular/router';



@Component({
    selector: 'ccnextgen-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    standalone: true,
    imports: [SidebarComponent, CommonModule, RouterOutlet],
    encapsulation: ViewEncapsulation.None
})
export class CCNextGenBaseLayout implements OnChanges{
    private _sidebarItems: SidebarItem[] = [];

    @Input() sidebarTemplate?: TemplateRef<any>;
    @Input() topbarTemplate?: TemplateRef<any>;
    @Input() sidebarBeforeMenu?: TemplateRef<any>;
    @Input() sidebarAfterMenu?: TemplateRef<any>;
    @Input() excludeSidebar: boolean = false;
    @Input() containerFluid: boolean = false;
    @Input() set sidebarItems(items: (SidebarItem | {
        title?: string;
        route?: string;
        icon?: string;
        isHR?: boolean;
        showIf?: (() => boolean) | boolean | null;
    })[] | null | undefined) {
        this._sidebarItems = (items ?? []).map(item => {
            if (item instanceof SidebarItem) return item;

            if (item.isHR) return new SidebarItem(true);

            // Provide fallback defaults or throw error/log if required properties missing
            const title = item.title ?? 'Untitled';
            const route = item.route ?? '/';
            const icon = item.icon ?? null;
            const showIf = item.showIf ?? null;

            return new SidebarItem(title, route, icon, false, showIf);
        });
    }

    get sidebarItems(): SidebarItem[] {
        return this._sidebarItems;
    }


    // Signal for template binding
    readonly hasCustomSidebar = signal(false);
    readonly hasCustomTopbar = signal(false);

    ngOnChanges() {
        this.hasCustomSidebar.set(!!this.sidebarTemplate);
        this.hasCustomTopbar.set(!!this.topbarTemplate);
    }

    toggleSidebar() {
        let isCollapsed = !this.isCollapsed;
        localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
    }

    get isCollapsed(): boolean {
        return localStorage.getItem('sidebar-collapsed') === 'true';
    }


}