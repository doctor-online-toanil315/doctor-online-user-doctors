export interface TimesheetType {
  items: TimeSheetInfo[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface TimeSheetInfo {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  newInTime: number;
  newOutTime: number;
  oldInTime?: number;
  oldOutTime?: number;
  comment: string;
  sendToIds: any[];
  status: number;
  userId: string;
  isAdminOrHrCreateRequest: boolean;
  sendToDTOs: UserInfo[];
  userInfo: UserInfo;
  timeSheetTracking: TimeSheetTracking;
  updateTotalTime: number;
  updateWorkingDay: number;
  escalate: string;
  escalateInfo: EscalateInfo;
  lateCheckIn: boolean;
  earlyCheckOut: boolean;
  morningCompensationTime: number;
  afternoonCompensationTime: number;
  totalTimeCompensationTime: number;
  currentState: State;
  nextStates: NextState[];
}

export interface UserInfo {
  id: string;
  name: string;
  cif: string;
  userType: string;
  registerType: string;
  profileType: string;
  registration: number;
  username: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  image: string;
  status: number;
  currentStatus?: number;
  organization: Organization;
  roles: Role[];
  jobTitle: JobTitle;
  directReport: DirectReport;
  fullName: string;
  office?: Office;
  permissions: string[];
  phone?: string;
  tenantId: string;
  companyEmail?: string;
  personalEmail?: string;
  birthDay?: string;
  syncLDAPDirectReport: boolean;
  ldapEntryDn: string;
  isDeletable: boolean;
  section?: string;
  isSkipCheckInOutNormal: boolean;
  lastModifiedDate: number;
  lastModifiedBy: string;
  reportTo: ReportTo;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  isDisable: boolean;
}

export interface JobTitle {
  id: string;
  name: string;
  vietnameseName: any;
}

export interface DirectReport {
  id: string;
  name: string;
}

export interface Office {
  id: string;
  name: string;
}

export interface ReportTo {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  tenantId: string;
  state: number;
  username: string;
  code: string;
  registerType: string;
  profileType: string;
  registration: number;
  title: Title;
  descendants: any[];
}

export interface Title {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  name: string;
  description: string;
  hasLevel: boolean;
  state: number;
  hasLDAPUser: boolean;
  isSkipCheckInOutNormal: boolean;
}

export interface TimeSheetTracking {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  trackingDate: number;
  userId: string;
  inTime: number;
  outTime: number;
  checkinFrom: string;
  checkoutFrom: string;
  lastAction: string;
  scheduleProcess: boolean;
  orgId: string;
  totalWorkingTime: number;
  workingDay: number;
  state: number;
  ot: number;
  lateCheckIn: boolean;
  earlyCheckOut: boolean;
  morningCompensationTime: number;
  afternoonCompensationTime: number;
  totalTimeCompensationTime: number;
  longitudeCheckIn?: number;
  latitudeCheckIn?: number;
  addressCheckIn?: string;
  checkInIsInOffice?: boolean;
  longitudeCheckOut?: number;
  latitudeCheckOut?: number;
  addressCheckOut?: string;
  checkOutIsInOffice?: boolean;
  isSkipCheckInOutNormal: boolean;
  isWrongFormat: boolean;
  isConflictData: boolean;
  isDataNotFound: boolean;
  isDuplicateRecord: boolean;
  isSubmitedLeaveRequest: boolean;
}

export interface EscalateInfo {
  id: string;
  name: string;
  cif: string;
  userType: string;
  registerType: string;
  profileType: string;
  registration: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  status: number;
  organization: Organization2;
  roles: Role2[];
  jobTitle: JobTitle2;
  directReport: DirectReport2;
  fullName: string;
  permissions: string[];
  phone: string;
  tenantId: string;
  companyEmail: string;
  personalEmail: string;
  birthDay: string;
  syncLDAPDirectReport: boolean;
  ldapEntryDn: string;
  isDeletable: boolean;
  section: string;
  isSkipCheckInOutNormal: boolean;
  lastModifiedDate: number;
  lastModifiedBy: string;
  reportTo: ReportTo2;
}

export interface Organization2 {
  id: string;
  name: string;
}

export interface Role2 {
  id: string;
  name: string;
  isDisable: boolean;
}

export interface JobTitle2 {
  id: string;
  name: string;
  vietnameseName: any;
}

export interface DirectReport2 {
  id: string;
  name: string;
}

export interface ReportTo2 {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  tenantId: string;
  state: number;
  username: string;
  code: string;
  registerType: string;
  profileType: string;
  registration: number;
  title: Title2;
  descendants: any[];
}

export interface Title2 {
  createdDate: number;
  createdBy: string;
  lastModifiedDate: number;
  lastModifiedBy: string;
  optCounter: number;
  id: string;
  name: string;
  description: string;
  hasLevel: boolean;
  state: number;
  hasLDAPUser: boolean;
  isSkipCheckInOutNormal: boolean;
}

export interface State {
  id: string;
  code: string;
  deleted: boolean;
  allState: boolean;
  stateType: State;
  name: string;
}

export interface NextState {
  id: string;
  processId: string;
  state: State;
  transition: Transition;
  pfSpecials: any[];
  success: boolean;
}

export interface Transition {
  name: string;
  id: string;
  allState: boolean;
  conditions: any[];
  postFunctions: any[];
  validators: any[];
}
