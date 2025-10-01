import { Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import { ConfigService } from '../config/config.service';
import { SidebarItem } from './sidebar.model';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ccnextgen-sidebar', 
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
    
    @Input() items: SidebarItem[] = [];
    @Input() beforeMenu?: TemplateRef<any>;
    @Input() afterMenu?: TemplateRef<any>;

    constructor(public config: ConfigService) {}

    ngOnInit(): void {
        this.log(this.items)
    }

    log(obj:any)
    {
        console.log(obj)
    }
}