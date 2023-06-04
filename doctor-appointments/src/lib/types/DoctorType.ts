import { ROLE_ENUM } from "doctor-online-common";
import { UserType } from "./UserTypes";

export interface DoctorType {
  id: string;
  doctorId: string;
  certificate: string;
  identityCardFrontSide: string;
  identityCardBackSide: string;
  yearOfExperience: number;
  specialize: string;
  isActive: boolean;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string | null;
  birthday: string | null;
  address: string;
  role: ROLE_ENUM;
  specializeTitle: string;
  rating: number;
  price: number;
  biography: string;
  user?: UserType;
}

export interface DoctorAchievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface DoctorEducation {
  id: string;
  title: string;
  date: string;
}

export interface DoctorWorkExperience extends DoctorEducation {}

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
