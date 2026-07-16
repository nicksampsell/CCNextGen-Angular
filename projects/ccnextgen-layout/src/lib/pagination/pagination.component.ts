import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './pagination.model';

@Component({
  selector: 'cc-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() pagination!: Pagination<any>;
  @Input() perPage: number = 10;
  @Input() search: string | null = null;

  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<number>();

  changePerPage(event: Event): void {
    const selectedPerPage = Number((event.target as HTMLSelectElement).value);
    this.perPageChange.emit(selectedPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.pagination.totalPages) return;
    this.pageChange.emit(page);
  }

  getDisplayPages(): number[] {
    const total = this.pagination.totalPages;
    const current = this.pagination.currentPage;
    const pageWindow = 10; // number of pages to show in the sliding window
    const pages: number[] = [];

    if (total <= pageWindow) {
      // total pages less than window size: show all
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Determine the start of the window
    let start = current - Math.floor(pageWindow / 2);

    if (start < 1) start = 1;

    let end = start + pageWindow - 1;

    if (end > total) {
      end = total;
      start = total - pageWindow + 1; // shift window if near end
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  get Number(): typeof Number {
    return Number;
  }
}
