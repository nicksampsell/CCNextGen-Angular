import { Component, Input, OnChanges, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ConfigService } from '../config/config.service';



@Component({
    selector: 'ccnextgen-loading',
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent implements OnChanges {
  @Input() message: string = 'Loading...';
  @Input() fullscreen: boolean = false;
  @Input() logo:string = 'assets/ccnextgen-logo.png';
  @Input() modal:boolean = false;

  constructor(public config: ConfigService) {}

  ngOnChanges() {
  if (this.modal || this.fullscreen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}
}