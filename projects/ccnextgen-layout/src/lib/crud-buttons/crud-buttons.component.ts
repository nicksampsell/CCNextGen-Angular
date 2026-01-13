import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type ButtonColor =
  | 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';

type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'ccnextgen-crud-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-buttons.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CrudButtons {

  @Input() itemId!: string | number;

  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showDetails = true;

  @Input() editUrl: string | null = 'edit';
  @Input() deleteUrl: string | null = 'delete';
  @Input() detailsUrl: string | null = 'details';

  @Input() buttonSize: ButtonSize = 'medium';
  @Input() editColor: ButtonColor = 'primary';
  @Input() deleteColor: ButtonColor = 'danger';
  @Input() detailsColor: ButtonColor = 'info';

  @Input() buttonsAsOutline = false;
  @Input() deleteWarning = 'Are you sure you want to delete this item?';

  @Output() editAction = new EventEmitter<string | number>();
  @Output() deleteAction = new EventEmitter<string | number>();
  @Output() detailsAction = new EventEmitter<string | number>();

  @Input() navigateOnEdit = true;
  @Input() navigateOnDelete = true;
  @Input() navigateOnDetails = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /* ============================
     Navigation helpers
     ============================ */

  private navigate(actionUrl: string | null): void {
    if (!actionUrl) {
      // Go up one level
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    const isAbsolute = actionUrl.startsWith('/');

    const commands = isAbsolute
      ? [actionUrl, this.itemId]
      : [actionUrl, this.itemId];

    this.router.navigate(commands, {
      relativeTo: isAbsolute ? undefined : this.route
    });
  }

  /* ============================
     Button handlers
     ============================ */

  onEdit(): void {
    this.editAction.emit(this.itemId);

    if(this.navigateOnEdit)
        this.navigate(this.editUrl);
  }

  onDetails(): void {
    this.detailsAction.emit(this.itemId);

    if(this.navigateOnDetails)
        this.navigate(this.detailsUrl);
  }

  onDelete(): void {
    if (!confirm(this.deleteWarning)) return;

    this.deleteAction.emit(this.itemId);
    
    if(this.navigateOnDelete)
        this.navigate(this.deleteUrl);
  }

  /* ============================
     Styling helpers
     ============================ */

  getButtonSize(): string {
    return this.buttonSize === 'small'
      ? 'btn-sm'
      : this.buttonSize === 'large'
      ? 'btn-lg'
      : '';
  }

  getColorClass(color: ButtonColor): string {
    return this.buttonsAsOutline
      ? `btn-outline-${color}`
      : `btn-${color}`;
  }
}
