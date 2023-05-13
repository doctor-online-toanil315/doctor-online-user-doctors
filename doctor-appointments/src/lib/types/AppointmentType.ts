import { ConsultationType } from "./ConsultionType";
import { UserType } from "./UserTypes";

export interface BaseAppointmentType {
  startTime: string;
  endTime: string;
  reasonForAppointment: string;
  attachment?: string;
  doctorId: string;
}

export interface AppointmentType {
  id: string;
  status: string;
  reasonDeclined: string;
  startTime: string;
  endTime: string;
  reasonForAppointment: string;
  isActive: boolean;
  user: UserType;
  attachment?: string;
  doctor: {
    id: string;
    certificate: string;
    identityCardFrontSide: string;
    identityCardBackSide: string;
    yearOfExperience: number;
    specialize: string;
    specializeTitle: string;
    rating: number;
    isActive: boolean;
    user: UserType;
  };
  consultion?: ConsultationType;
}

export interface UpdateAppointmentStatus {
  id: string;
  status: string;
  reasonDeclined: string;
  startTime: string;
  endTime: string;
  reasonForAppointment: string;
}
