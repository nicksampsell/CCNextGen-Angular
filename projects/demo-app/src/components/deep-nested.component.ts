import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PageHeader, DashboardLinks, LoadingComponent, AppErrorComponent, CrudButtons } from 'ccnextgen-layout'


@Component({
  selector: 'app-deep-nested',
  imports: [PageHeader, DashboardLinks, CommonModule, CrudButtons],
  templateUrl: './deep-nested.component.html',
  standalone: true
})
export class DeepNestedPage{
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
