import { FORM_OF_MEDICINE, METHOD_OF_INTAKE } from "../constants";

export interface MedicineType {
  id: string;
  name: string;
  image: string;
  descriptions: string;
  benefits: string;
  restrict: string;
  form: FORM_OF_MEDICINE;
  methodOfIntake: METHOD_OF_INTAKE;
  isActive: boolean;
}
