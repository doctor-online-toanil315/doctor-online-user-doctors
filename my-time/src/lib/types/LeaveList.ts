// No Check My Team
export interface TableNoFilter {
  fromDate: number;
  toDate: number;
}

export interface DataTableNoFilter {
  hasNext: boolean;
  hasPrevious: boolean;
  items: IDataTableNoFilter[];
  page: number;
  size: number;
  totalElements: number;
  totalItems: number;
  totalPages: number;
}

export interface ICurrentState {
  allState: boolean;
  code: string;
  deleted: boolean;
  description: boolean;
  id: string;
  name: string;
  stateType: IStateType;
}

export interface IStateType {
  color: string;
  deleted: boolean;
  description: string;
  id: string;
  name: string;
}

export interface IEmployeeId {
  cif: string;
  firstName: string;
  fullName: string;
  id: string;
  isDeletable: boolean;
  isSkipCheckInOutNormal: boolean;
  lastModifiedDate: number;
  lastName: string;
  status: number;
  syncLDAPDirectReport: boolean;
  username: string;
}

export interface IEscalateDTO {
  cif: string;
  firstName: string;
  fullName: string;
  id: string;
  isDeletable: boolean;
  isSkipCheckInOutNormal: boolean;
  lastModifiedDate: number;
  lastName: string;
  status: number;
  syncLDAPDirectReport: boolean;
  username: string;
}

export interface IItems {
  afternoon: boolean;
  fullDay: boolean;
  morning: boolean;
}

export interface ILeaveType {
  deleted: boolean;
  description: string;
  id: string;
  name: string;
  orgId: string;
  paidLeave: boolean;
  paidLeaveTransfer: boolean;
  processId: string;
  status: number;
  tenantId: string;
}

export interface IState {
  allState: boolean;
  code: string;
  deleted: boolean;
  id: string;
  name: string;
  stateType: IStateType;
}

export interface ITransition {
  allState: false;
  conditions: [];
  id: string;
  name: string;
  postFunctions: [];
  validators: [];
}

export interface INextStates {
  id: string;
  pfSpecials: [];
  processId: string;
  state: IState;
  success: boolean;
  transition: ITransition;
}

export interface IDataTableNoCheck {
  key: string;
  cif: string;
  fullName: string;
  leaveType: string;
  currentState: string;
  dateRange: string;
  days: string;
  nextStates: any;
}

export interface IDataTableNoFilter {
  code: string;
  comment: string;
  createdDate: number;
  currentState: ICurrentState;
  duration: number;
  durationInDay: number;
  employeeDTO: IEmployeeId;
  employeeId: string;
  escalateDTO: IEscalateDTO;
  fromDate: string;
  id: string;
  isAdminOrHrCreateRequest: boolean;
  isHistory: boolean;
  items: IItems[];
  lastModifiedDate: number;
  leaveType: ILeaveType;
  nextStates: INextStates[];
  requestId: string;
  sendToDTOs: [];
  status: number;
  toDate: string;
  transition: any[];
}

export interface DataType {
  key?: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}
