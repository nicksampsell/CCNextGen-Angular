import { Component } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
    selector: 'ccnextgen-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.css',
})
export class TopbarComponent{
    
    constructor(public config: ConfigService) {}

}