export interface ApiResponseBase<T> {
  data: T;
}

export interface ApiResponseImpl<T> extends ApiResponseBase<T> {
  success: true;
  error: null;
}

export interface ApiResponseWithPaginate<T> extends ApiResponseBase<T> {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}
