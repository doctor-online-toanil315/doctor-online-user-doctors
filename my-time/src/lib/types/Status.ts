export interface Status {
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
}
