import { ROLE_ENUM } from ".yalc/doctor-online-common/dist";

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
}
