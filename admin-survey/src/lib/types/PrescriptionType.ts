import { MedicineType } from "./MedicineType";

export interface BasePrescriptionType {
  notes: string;
  dosage: number;
  when: string;
  quantity: number;
}

export interface PrescriptionType extends BasePrescriptionType {
  id: string;
  medicine: MedicineType;
}

export interface AddPrescriptionType extends BasePrescriptionType {
  consultionId: string;
  medicineId: string;
}
