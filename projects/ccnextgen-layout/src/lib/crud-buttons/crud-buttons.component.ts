import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../sidebar/sidebar.model';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'ccnextgen-crud-buttons',
    templateUrl: './crud-buttons.component.html',
    styleUrl: './crud-buttons.component.css',
    standalone: true,
    imports: [CommonModule, RouterModule],
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

    constructor(private router:Router) {}

    onDelete(){
        if(confirm(this.deleteWarning))
        {
            this.deleteAction.emit(this.itemId);
            if(this.deleteUrl)
            {
                this.router.navigate([this.deleteUrl, this.itemId]);
            }
        }
    }

    onEdit(){
        this.editAction.emit(this.itemId);
        if(this.editUrl)
        {
            this.router.navigate([this.editUrl, this.itemId]);
        }
    }

    onDetails(){
        this.detailsAction.emit(this.itemId);
        if(this.detailsUrl)
        {
            this.router.navigate([this.detailsUrl, this.itemId]);
        }
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
