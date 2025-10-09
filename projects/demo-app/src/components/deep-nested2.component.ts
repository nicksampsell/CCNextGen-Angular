import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PageHeader, DashboardLinks, LoadingComponent, AppErrorComponent, CrudButtons } from 'ccnextgen-layout'


@Component({
  selector: 'app-deep-nested2',
  imports: [CommonModule,PageHeader],
  templateUrl: './deep-nested2.component.html',
  standalone: true
})
export class DeepNested2Page{
  protected readonly title = signal('demo-app');



  search:string = '';
  buttons = [
    {
        icon: 'dashboard',
        route: '/dashboard',
        title: 'Dashboard',
        showButton: false
    },
    {
        icon: 'list',
        route: '/items',
        title: 'Items',
        onclick: () => alert('Clicked')
    },
    {
        icon: 'settings',
        route: '/settings',
        title: 'Settings'
    }
  ]

}
