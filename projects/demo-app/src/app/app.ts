import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, LoadingComponent, AppErrorComponent } from 'ccnextgen-layout'


@Component({
  selector: 'app-root',
  imports: [CCNextGenBaseLayout, LoadingComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo-app');
  loading = false;

  
  ngOnInit() {
    // Simulate loading delay (e.g. 3 seconds)
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  buttons = [
    {
      title: 'Home',
      route: '/',
      icon: 'home',
    },
    {
      title: 'Help',
      route: '/help',
      icon: 'help',
    },
    {
      isHR: true
    },
    {
      title: 'Editor',
      route: '/edit',
      icon: 'edit',
    },
    {
      title: 'Deeply Nested',
      route: '/deeply/nested',
      icon: 'chevron_right',
    }
  ]
}
