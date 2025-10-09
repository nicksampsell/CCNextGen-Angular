import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, PageHeader, SidebarComponent, ButtonModel, SearchBox, CrudButtons, AppErrorComponent } from 'ccnextgen-layout'


@Component({
  selector: 'app-index',
  imports: [AppErrorComponent],
  templateUrl: './error.component.html',
  standalone: true
})
export class ErrorPage {
  protected readonly title = signal('demo-app');

}
