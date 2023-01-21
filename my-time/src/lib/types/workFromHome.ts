export interface IWorkFromHome {
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
  escalate: string;
  escalateInfo: {
    birthDay: string;
    cif: string;
    companyEmail: string;
    directReport: {
      id: string;
      name: string;
    };
    firstName: string;
    fullName: string;
    id: string;
    image: string;
    isDeletable: boolean;
    isSkipCheckInOutNormal: boolean;
    jobTitle: {
      id: string;
      name: string;
      vietnameseName: any;
    };
    lastModifiedBy: string;
    lastModifiedDate: number;
    lastName: string;
    ldapEntryDn: string;
    name: string;
    organization: {
      id: string;
      name: string;
    };
    permissions: string[];
    personalEmail: string;
    phone: string;
    profileType: string;
    registerType: string;
    registration: number;
    reportTo: {
      createdBy: string;
      createdDate: number;
      descendants: [];
      id: string;
      lastModifiedBy: string;
      lastModifiedDate: number;
      optCounter: number;
      profileType: string;
      registerType: string;
      registration: number;
      state: number;
      tenantId: string;
      username: string;
    };
    roles: IRoles[];
    section: string;
    status: number;
    syncLDAPDirectReport: boolean;
    tenantId: string;
    userType: string;
    username: string;
  };
  fromDate: number;
  id: string;
  isAdminOrHrCreateRequest: boolean;
  lastModifiedBy: string;
  lastModifiedDate: number;
  nextStates: INextStates[];
  optCounter: number;
  requestId: string;
  sendToDTOs: [];
  sendToIds: [];
  status: number;
  toDate: number;
  totalDay: number;
  userId: string;
  userInfo: {
    birthDay: string;
    cif: string;
    companyEmail: string;
    directReport: {
      id: string;
      name: string;
    };
    firstName: string;
    fullName: string;
    id: string;
    image: string;
    isDeletable: boolean;
    isSkipCheckInOutNormal: boolean;
    jobTitle: {
      id: string;
      name: string;
      vietnameseName: any;
    };
    lastModifiedBy: string;
    lastModifiedDate: number;
    lastName: string;
    ldapEntryDn: string;
    name: string;
    organization: {
      id: string;
      name: string;
    };
    permissions: string[];
    personalEmail: string;
    phone: string;
    profileType: string;
    registerType: string;
    registration: number;
    reportTo: {
      code: string;
      createdBy: string;
      createdDate: number;
      descendants: [];
      id: string;
      lastModifiedBy: string;
      lastModifiedDate: number;
      optCounter: number;
      profileType: string;
      registerType: string;
      registration: number;
      state: number;
      tenantId: string;
      title: {
        createdBy: string;
        createdDate: number;
        description: string;
        hasLDAPUser: boolean;
        hasLevel: boolean;
        id: string;
        isSkipCheckInOutNormal: boolean;
        lastModifiedBy: string;
        lastModifiedDate: number;
        name: string;
        optCounter: number;
        state: number;
      };
      username: string;
    };
    roles: IRoles[];
    section: string;
    status: number;
    syncLDAPDirectReport: boolean;
    tenantId: string;
    userType: string;
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

export interface IRoles {
  id: string;
  isDisable: boolean;
  name: string;
}
