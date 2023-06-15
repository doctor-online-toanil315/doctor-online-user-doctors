import { ConsultationTestType } from "./ConsultionTestType";
import { PrescriptionType } from "./PrescriptionType";

export interface ConsultationType {
  id: string;
  causeOfIllness: string;
  notes: string;
  prescriptions: PrescriptionType[];
  consultionTests: ConsultationTestType[];
}
