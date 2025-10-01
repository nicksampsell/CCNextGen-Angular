import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, LoadingComponent, SidebarComponent } from 'ccnextgen-layout'


@Component({
  selector: 'app-root',
  imports: [CCNextGenBaseLayout, SidebarComponent, RouterLink, LoadingComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo-app');
  loading = true;

  
  ngOnInit() {
    // Simulate loading delay (e.g. 3 seconds)
    setTimeout(() => {
      //this.loading = false;
    }, 5000);
  }
}
