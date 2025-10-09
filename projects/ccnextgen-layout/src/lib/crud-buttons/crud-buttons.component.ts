import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../sidebar/sidebar.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ccnextgen-crud-buttons',
    templateUrl: './crud-buttons.component.html',
    styleUrl: './crud-buttons.component.css',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class CrudButtons {
    @Input() itemId: string | number = '';
    @Input() showEdit:boolean = true;
    @Input() showDelete:boolean = true;
    @Input() showDetails:boolean = true;
    @Input() editUrl: string | null= 'edit';
    @Input() deleteUrl: string | null= 'delete'
    @Input() detailsUrl: string | null = 'details';
    @Input() buttonSize: 'small' | 'medium' | 'large' = 'medium';
    @Input() editColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
    @Input() deleteColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'danger';
    @Input() detailsColor: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'info';
    @Input() buttonsAsOutline:boolean = false;
    @Input() deleteWarning:string = 'Are you sure you want to delete this item?';

    @Output() editAction = new EventEmitter<string | number>();
    @Output() deleteAction = new EventEmitter<string | number>();
    @Output() detailsAction = new EventEmitter<string | number>();

    constructor(private router:Router, private route: ActivatedRoute) {}

    private navigate(actionUrl: string | null, defaultActionSegment: string) {
        const id = this.itemId;
        const knownActions = ['edit', 'details', 'delete', 'view', 'update', 'create'];
        const route = actionUrl?.trim();

        // If route is empty or null — navigate up one level logically
        if (!route) {
            const currentUrl = this.router.url.replace(/\/+$/, ''); // Remove trailing slash
            const segments = currentUrl.split('/').filter(Boolean);

            const last = segments[segments.length - 2]?.toLowerCase();
            const isKnownAction = knownActions.includes(last);
            const isLastSegmentId = !isNaN(Number(segments[segments.length - 1]));

            // Remove action + id if present, else remove just last segment
            const baseSegments = isKnownAction && isLastSegmentId
                ? segments.slice(0, -2)
                : segments.slice(0, -1);

            const newUrl = '/' + baseSegments.join('/');
            this.router.navigateByUrl(newUrl);
            return;
        }

        // If the actionUrl matches the default action segment (e.g. "edit") or is empty, treat it as relative route
        const isDefault = route.toLowerCase() === defaultActionSegment.toLowerCase();

        if (!isDefault) {
            // Route is a custom absolute path or something else, just navigate normally with id
            this.router.navigate([route, id]);
        } else {
            // Build relative route by stripping trailing action/id and appending new action/id
            const currentUrl = this.router.url.replace(/\/+$/, '');
            const segments = currentUrl.split('/').filter(Boolean);

            const last = segments[segments.length - 2]?.toLowerCase();
            const isLastAction = knownActions.includes(last);

            const baseSegments = isLastAction && !isNaN(Number(segments[segments.length - 1]))
                ? segments.slice(0, -2)
                : segments;

            const newUrl = [...baseSegments, defaultActionSegment, id];
            this.router.navigate(newUrl);
        }
    }


    onDelete(){
        if(confirm(this.deleteWarning))
        {
            this.deleteAction.emit(this.itemId);
            this.navigate(this.deleteUrl, 'delete');
        }
    }

    onEdit(){
        this.editAction.emit(this.itemId);
        this.navigate(this.editUrl, 'edit');
    }

    onDetails(){
        this.detailsAction.emit(this.itemId);
        this.navigate(this.detailsUrl, 'details')
    }

    getButtonSize()
    {
        switch(this.buttonSize){
            case 'small': return 'btn-sm';
            case 'large': return 'btn-lg';
            default: return '';
        }
    }

    getColorClass(color: string)
    {
        if(this.buttonsAsOutline){
            return `btn-outline-${color}`;
        }
        return `btn-${color}`;
    }
}
