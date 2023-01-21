export interface Leave {
  leaveTypeDescription: string;
  leaveTypeId: string;
  leaveTypeName: string;
  remainingEntitlement: number;
  availableLeave: number;
  hasAvailableLeave: boolean;
}

export interface LeaveMe {
  code: string;
  comment: string;
  createdDate: number;
  currentState: {
    allState: boolean;
    code: string;
    deleted: boolean;
    id: string;
    name: string;
    stateType: {
      color: string;
      deleted: boolean;
      description: string;
      id: string;
      name: string;
    };
  };
  duration: number;
  durationInDay: number;
  employeeDTO: {
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
  };
  employeeId: string;
  escalateDTO: {
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
  };
  fromDate: string;
  id: string;
  isAdminOrHrCreateRequest: boolean;
  isHistory: boolean;
  items: {
    fromTime?: number;
    toTime?: number;
    afternoon: boolean;
    fullDay: boolean;
    morning: boolean;
  }[];
  lastModifiedDate: number;
  leaveType: {
    deleted: boolean;
    id: string;
    name: string;
    orgId: string;
    paidLeave: boolean;
    paidLeaveTransfer: boolean;
    processId: string;
    status: number;
    tenantId: string;
  };
  nextStates: {
    id: string;
    pfSpecials: [];
    processId: string;
    state: {
      allState: boolean;
      code: string;
      deleted: boolean;
      description: string;
      id: string;
      name: string;
    };
    success: boolean;
    transition: {
      allState: boolean;
      conditions: [];
      id: string;
      name: string;
      postFunctions: [];
      validators: [];
    };
  }[];
  requestId: string;
  sendToDTOs: [];
  status: number;
  toDate: string;
}

export interface LeaveMyResponse {
  code: string;
  data: {
    hasNext: boolean;
    hasPrevious: boolean;
    items: LeaveMe[];
    page: number;
    size: number;
    totalElements: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface LeaveMeTable {
  key: string;
  dateRange: string;
  leaveTypeName: string;
  days: number;
  status: string;
  comment: string;
  currentState: {
    allState: boolean;
    code: string;
    deleted: boolean;
    id: string;
    name: string;
    stateType: {
      color: string;
      deleted: boolean;
      description: string;
      id: string;
      name: string;
    };
  };
  nextStates: {
    id: string;
    pfSpecials: [];
    processId: string;
    state: {
      allState: boolean;
      code: string;
      deleted: boolean;
      description: string;
      id: string;
      name: string;
    };
    success: boolean;
    transition: {
      allState: boolean;
      conditions: [];
      id: string;
      name: string;
      postFunctions: [];
      validators: [];
    };
  }[];
}
