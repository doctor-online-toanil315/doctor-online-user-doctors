import { DoctorType } from "./DoctorType";

export interface BaseWorkingTimeType {
  monFrom: string;
  monTo: string;
  tueFrom: string;
  tueTo: string;
  wedFrom: string;
  wedTo: string;
  thuFrom: string;
  thuTo: string;
  friFrom: string;
  friTo: string;
  satFrom: string;
  satTo: string;
  sunFrom: string;
  sunTo: string;
  isMonOpen: boolean;
  isTueOpen: boolean;
  isWedOpen: boolean;
  isThuOpen: boolean;
  isFriOpen: boolean;
  isSatOpen: boolean;
  isSunOpen: boolean;
}

export interface WorkingTimeType extends BaseWorkingTimeType {
  id: string;
  doctor?: DoctorType;
}

export interface UpdateWorkingType extends BaseWorkingTimeType {
  id: string;
  doctorId: string;
}
