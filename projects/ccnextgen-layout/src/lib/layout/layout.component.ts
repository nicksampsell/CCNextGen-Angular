import { Component, Input, OnChanges, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
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
    @Input() containerFluid: boolean = false;
    @Input() set sidebarItems(items: (SidebarItem | {
        title?: string;
        route?: string;
        icon?: string;
        isHR?: boolean;
    })[]) {
        this._sidebarItems = items.map(item =>
            item instanceof SidebarItem
                ? item
                : item.isHR
                    ? new SidebarItem(true)  // only isHR
                    : new SidebarItem(item.title!, item.route!, item.icon ?? null, false)
        );
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

}