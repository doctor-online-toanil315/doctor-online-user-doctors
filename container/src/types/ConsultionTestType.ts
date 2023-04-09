import { LabTest } from "./LabTestType";

export interface ConsultationTestType {
  id: string;
  notes: string;
  priority: string;
  reason: string;
  status: number;
  test: LabTest;
}
