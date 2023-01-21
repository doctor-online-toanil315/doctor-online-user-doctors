import { State, TimeSheetInfo } from './timesheet';

export interface BulkItemType {
  name: string;
  data: BulkType[];
}

export interface BulkType {
  requests: TimeSheetInfo[];
  targetStatus: State;
  previousStatus: State[];
  actionName: string;
  requestType: number;
}
