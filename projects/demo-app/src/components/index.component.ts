import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, PageHeader, SidebarComponent, ButtonModel, SearchBox } from 'ccnextgen-layout'


@Component({
  selector: 'app-index',
  imports: [PageHeader, SearchBox],
  templateUrl: './index.component.html',
  standalone: true
})
export class IndexPage {
  protected readonly title = signal('demo-app');

  search:string = '';

  handleSearch(value:string|null)
  {
        this.search = value ?? '';
  }
}
