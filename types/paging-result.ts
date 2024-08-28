export type PagingResult<T> = {
  results: T[];
  total: number;
  page: number;
  limit: number;
};