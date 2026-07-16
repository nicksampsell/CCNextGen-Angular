export interface Pagination<T> {
  totalItems: number;
  currentPage: number;
  nextPage?: number;
  previousPage?: number;
  totalPages: number;
  results: T[];
}
