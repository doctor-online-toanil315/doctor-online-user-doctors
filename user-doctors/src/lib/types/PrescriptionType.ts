import { MedicineType } from "./MedicineType";

export interface PrescriptionType {
  id: string;
  dosage: number;
  when: string;
  quantity: number;
  notes: string;
  medicine: MedicineType;
}
