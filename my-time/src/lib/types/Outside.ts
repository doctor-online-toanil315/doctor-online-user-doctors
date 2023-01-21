export interface Outside {
  code: string;
  comment: string;
  createdBy: string;
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
  escalate: string;
  escalateInfo: {
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
  fromDate: number;
  id: string;
  isAdminOrHrCreateRequest: boolean;
  lastModifiedBy: string;
  lastModifiedDate: number;
  nextStates: {
    id: string;
    pfSpecials: [];
    processId: string;
    state: {
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
  officeDTO: {
    id: string;
    name: string;
  };
  optCounter: number;
  sendToDTOs: [];
  sendToIds: [];
  status: number;
  toDate: number;
  totalDay: number;
  userId: string;
  userInfo: {
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
}

export interface OutsideResponse {
  code: string;
  data: {
    hasNext: boolean;
    hasPrevious: boolean;
    items: Outside[];
    page: number;
    size: number;
    totalElements: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface OutsideTable {
  key: string;
  cif: string;
  name: string;
  fromDate: string;
  totalDay: number;
  comment: string;
  status: string;
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

export interface OutsideOperationTransactions {
  actionName: string;
  previousStatus: {
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
  requestType: number;
  requests: Outside[];
  targetStatus: {
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
}

export interface OutsideOperationTransactionsData {
  name: string;
  data: OutsideOperationTransactions[];
}

export interface OutsideOperationTransactionsResponse {
  code: string;
  data: OutsideOperationTransactionsData[];
}
