export interface IWorkingAfterHourss {
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
      deleted: false;
      description: string;
      id: string;
      name: string;
    };
  };
  duration: number;
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
  nextStates: INextStates[];
  optCounter: number;
  sendToDTOs: [];
  status: number;
  toDate: number;
  type: string;
  user: {
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

export interface INextStates {
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
}
