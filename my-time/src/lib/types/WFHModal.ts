export interface IStateType {
  color: string;
  deleted: boolean;
  description: string;
  id: string;
  name: string;
}

export interface IState {
  allState: boolean;
  code: string;
  deleted: boolean;
  description?: string;
  id: string;
  name: string;
  stateType: IStateType;
}

export interface INextState {
  id: string;
  state: IState;
  transition: {
    id: string;
    name: string;
  };
}

export interface IWFHItem {
  id: string;
  userInfo: {
    id: string;
    cif: string;
    fullName: string;
  };
  fromDate: Date;
  toDate: Date;
  totalDay: number;
  status: number;
  currentState: IState;
  comment: string;
  nextStates: INextState[];
}

export interface IWFHItemTable extends IWFHItem {
  cif: string;
  dateRange: string;
  key: string;
}

export interface IWFHs {
  items: IWFHItem[];
  totalElements: number;
  totalItems: number;
  totalPages: number;
}
