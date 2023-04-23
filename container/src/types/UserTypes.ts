import { AppointmentType } from "./AppointmentType";
import { DoctorType } from "./DoctorType";

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string | null;
  birthday: string | null;
  gender: string;
  address: string | null;
  role: string;
  doctor?: DoctorType;
}

export interface PatientType extends UserType {
  appointments: AppointmentType[];
}
