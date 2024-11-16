export interface ServerResponse<T = object> {
  statusCode: number;
  data?: object | ServerPaginatedResponse<T>;
  error?: object;
}

export interface ServerPaginatedResponse<T> {
  elements: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
