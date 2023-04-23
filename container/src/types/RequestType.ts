import { APPOINTMENT_STATUS } from "../constants";

export interface ApiQueryType {
  page: number;
  size: number;
  search?: string;
  from?: string;
  to?: string;
}

export interface AppointmentQueryType extends ApiQueryType {
  status?: APPOINTMENT_STATUS;
}
