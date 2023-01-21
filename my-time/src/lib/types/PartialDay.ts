export interface PartialDay {
  id: string;
  name: string;
  status: number;
  type: number;
}

export enum Partial {
  none = 0,
  allDays = 1,
  startDay = 2,
  endDay = 3,
  startAndEndDay = 4
}
