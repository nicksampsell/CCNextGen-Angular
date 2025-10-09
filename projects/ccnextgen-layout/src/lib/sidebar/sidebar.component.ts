import { Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import { ConfigService } from '../config/config.service';
import { SidebarItem } from './sidebar.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ccnextgen-sidebar', 
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
    
    @Input() items: SidebarItem[] = [];
    @Input() beforeMenu?: TemplateRef<any>;
    @Input() afterMenu?: TemplateRef<any>;

    constructor(public config: ConfigService) {}

}