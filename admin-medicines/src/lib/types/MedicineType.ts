import { FORM_OF_MEDICINE, METHOD_OF_INTAKE } from "../constants";

export interface BaseMedicineType {
  name: string;
  image: string;
  descriptions: string;
  benefits: string;
  restrict: string;
  form: FORM_OF_MEDICINE;
  methodOfIntake: METHOD_OF_INTAKE;
}

export interface MedicineType extends BaseMedicineType {
  id: string;
  isActive: boolean;
}

export interface AddMedicineType extends BaseMedicineType {}

export interface UpdateMedicineType extends BaseMedicineType {
  id: string;
}
