
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModel, PageHeader } from 'ccnextgen-layout'


@Component({
  selector: 'app-form',
  imports: [PageHeader],
  templateUrl: './form.component.html',
  standalone: true
})
export class FormPage {
  protected readonly title = signal('demo-app');
}
