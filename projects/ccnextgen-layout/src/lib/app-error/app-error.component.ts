import { Component, Input, OnChanges, OnInit, signal, TemplateRef, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ConfigService } from '../config/config.service';
import { PageHeader } from '../page-header/page-header.component';
import { Router, RouterLink } from '@angular/router';



@Component({
    selector: 'ccnextgen-app-error',
    templateUrl: './app-error.component.html',
    styleUrl: './app-error.component.css',
    standalone: true,
    imports: [CommonModule, PageHeader, RouterLink],
    encapsulation: ViewEncapsulation.None
})
export class AppErrorComponent implements OnChanges, OnInit {
  @Input() message: string = '';
  @Input() goToPage: string = '/';
  @Input() goToPageName: string = 'home page';
  @Input() fullscreen: boolean = false;
  @Input() logo:string = 'assets/ccnextgen-logo.png';
  @Input() modal:boolean = false;
  @Input() title: string = 'Error'
  @Input() error: '404' | '403' | 'invalid-user' | '500' | '' = '';
  @Input() errorCode: number | null = 500;
  @Input() hideLogo: boolean = false;

  

  currentUrl: string = '';
  constructor(public config: ConfigService, private router: Router) {
    this.currentUrl = this.router.url;
  }


  ngOnInit(): void {
    this.errorCode = (this.error == '404' || this.error == '403' || this.error == '500') ? Number(this.error) : null;
  }

  ngOnChanges() {
    if (this.modal || this.fullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}