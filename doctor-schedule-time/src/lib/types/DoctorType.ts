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

export interface UpdateDoctorType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  certificate: string;
  identityCardFrontSide: string;
  identityCardBackSide: string;
  yearOfExperience: number;
  specialize: string;
  specializeTitle: string;
  price: number;
  biography: string;
}

export interface CreateDoctorEducationType {
  title: string;
  date: string;
  doctorId: string;
}

export interface CreateDoctorWorkExperience extends CreateDoctorEducationType {}

export interface CreateDoctorAchievement {
  title: string;
  date: string;
  description: string;
  doctorId: string;
}
