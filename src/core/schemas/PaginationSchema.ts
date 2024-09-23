export interface Params {
  page?: number;
  size?: number;
}

export interface Paginated<T> {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  items: T[];
}
