import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../sidebar/sidebar.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'ccnextgen-search',
    templateUrl: './search.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class SearchBox implements OnInit {
    
    @Input() search?: string;
    @Output() searchEvent = new EventEmitter<string|null>();
    showClear:boolean = false;
    
    searchForm = new FormControl(this.search ?? '')

    ngOnInit(): void {
        if(!!this.search)
        {
            this.showClear = true;
        }
    }

    doSubmit()
    {
        if(this.searchForm.valid)
        {
            console.log(this.searchForm.value);
            this.searchEvent.emit(this.searchForm.value ?? '')
            this.showClear = true;
        }
    }

    clearSearch()
    {
        this.searchEvent.emit(null)
        this.showClear = false;
        this.searchForm.reset();
    }

}