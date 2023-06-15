import { GENDER_ENUM } from "../constants";
import { DoctorType } from "./DoctorType";

export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string | null;
  birthday: string | null;
  address: string | null;
  role: string;
  doctor?: DoctorType;
  gender: GENDER_ENUM;
}

export interface UpdateUserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  birthday: string;
  address: string;
  role: string;
  gender: GENDER_ENUM;
  password?: string;
}

export interface UpdatePasswordType {
  email: string;
  password: string;
  newPassword: string;
}
