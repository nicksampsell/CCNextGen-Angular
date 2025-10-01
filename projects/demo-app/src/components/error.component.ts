import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CCNextGenBaseLayout, PageHeader, SidebarComponent, ButtonModel, SearchBox, CrudButtons } from 'ccnextgen-layout'


@Component({
  selector: 'app-index',
  imports: [PageHeader, SearchBox, CrudButtons],
  templateUrl: './index.component.html',
  standalone: true
})
export class ErrorPage {
  protected readonly title = signal('demo-app');

  search:string = '';

  handleSearch(value:string|null)
  {
        this.search = value ?? '';
  }

  onDelete(id:string|number)
  {
    alert(`Delete action clicked for item with id: ${id}`);
  }

  onEdit(id:string|number)
  {
    alert(`Edit action clicked for item with id: ${id}`);
  }

  onDetails(id:string|number)
  {
    alert(`Details action clicked for item with id: ${id}`);
  }
}
