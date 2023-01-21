import { EscalateInfo, NextState, State, UserInfo } from './timesheet';

export interface IWorkingAfterHoursRes {
  items: IWorkingAfterHours[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface IWorkingAfterHours {
  code: string;
  comment: string;
  createdBy: string;
  createdDate: number;
  currentState: State;
  duration: number;
  escalate: string;
  escalateInfo: EscalateInfo;
  fromDate: number;
  id: string;
  isAdminOrHrCreateRequest: boolean;
  lastModifiedBy: string;
  lastModifiedDate: number;
  nextStates: NextState[];
  optCounter: number;
  sendToDTOs: UserInfo[];
  status: number;
  toDate: number;
  type: string;
  user: UserInfo[];
}
