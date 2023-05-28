import { ConsultationTestType } from "./ConsultionTestType";
import { PrescriptionType } from "./PrescriptionType";

export interface BaseConsultationType {
  causeOfIllness: string;
  notes: string;
}
export interface ConsultationType extends BaseConsultationType {
  id: string;
  prescriptions: PrescriptionType[];
  consultionTests: ConsultationTestType[];
}

export interface AddConsultationType extends BaseConsultationType {
  appointmentId: string;
}

export interface UpdateConsultationType extends BaseConsultationType {
  consultionId: string;
}
