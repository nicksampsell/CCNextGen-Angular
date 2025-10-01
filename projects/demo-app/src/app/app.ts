import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, SidebarComponent } from 'ccnextgen-layout'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CCNextGenBaseLayout, SidebarComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo-app');
}
