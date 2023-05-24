import { ROLE_ENUM } from "doctor-online-common";
import { UserType } from "./UserTypes";

export interface DoctorType {
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
  id: string;
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

export interface BaseDoctorReview {
  recommend: boolean;
  problem: string;
  reasonHappyWith: string;
  rate: number;
  experience: string;
}

export interface DoctorReview extends BaseDoctorReview {
  id: string;
  created_at: Date;
  updated_at: Date;
  doctor: DoctorType;
  user: UserType;
}

export interface DoctorReviewDto extends BaseDoctorReview {
  doctorId: string;
}

export interface GetDoctorEvent {
  id: string;
  from: number;
  to: number;
}

export interface DoctorEvent {
  id: string;
  type: string;
  from: string;
  to: string;
  description: string;
  note: string;
}

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
