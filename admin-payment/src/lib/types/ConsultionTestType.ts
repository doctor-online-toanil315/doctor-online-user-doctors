import { LabTest } from "./LabTestType";

export interface BaseConsultationTestType {
  notes: string;
  priority: string;
  reason: string;
}

export interface ConsultationTestType extends BaseConsultationTestType {
  id: string;
  status: number;
  test: LabTest;
}

export interface AddConsultationTestType extends BaseConsultationTestType {
  consultionId: string;
  testId: string;
}
