export interface ApiQueryType {
  page: number;
  size: number;
  search?: string;
  from?: string | number;
  to?: string | number;
  specialList?: string[];
}
