export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

export interface UserResponse {
  code: string;
  data: User[];
}

export interface IDirectReport {
  avatar: string;
  id: string;
  name: string;
  username: string;
}

export interface DirectReportResponse {
  code: string;
  data: IDirectReport;
}
