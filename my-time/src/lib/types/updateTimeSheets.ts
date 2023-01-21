export interface IUpdateTimeSheets {
  userId: string;
  createdDate: number;
  createdBy: string;
  id: string;
  newInTime: number;
  newOutTime: number;
  nextStates: INextStates[];
  updateTotalTime: number;
  updateWorkingDay: number;
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
  comment: string;
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
