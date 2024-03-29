export { AuthAPI, useGetMeQuery, useLazyGetMeQuery } from "./AuthAPI";
export {
  DoctorAPI,
  useGetDoctorsQuery,
  useLazyGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorAchievementsQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
} from "./DoctorAPI";
export {
  AppointmentAPI,
  useGetAppointmentByIdQuery,
  useGetAppointmentByUserQuery,
  useAddAppointmentMutation,
  useGetAppointmentByDoctorQuery,
  useLazyGetAppointmentByDoctorQuery,
  useUpdateAppointmentMutation,
  useGetPatientOfDoctorQuery,
  useAddConsultationMutation,
  useUpdateConsultationMutation,
  useAddMedicineMutation,
  useAddTestMutation,
} from "./AppointmentAPI";
export { NotificationAPI, useGetNotificationsQuery } from "./NotificationAPI";
export { MedicineAPI, useGetMedicinesQuery } from "./MedicineAPI";
export { LabTestAPI, useGetLabTestsQuery } from "./LabTestAPI";
