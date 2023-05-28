export { AuthAPI, useGetMeQuery, useLazyGetMeQuery } from "./AuthAPI";
export {
  DoctorAPI,
  useGetDoctorsQuery,
  useLazyGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorAchievementsQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
  useAddDoctorMutation,
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
  useAddTestMutation,
  useGetAllAppointmentsQuery,
} from "./AppointmentAPI";
export { NotificationAPI, useGetNotificationsQuery } from "./NotificationAPI";
export {
  MedicineAPI,
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} from "./MedicineAPI";
export {
  LabTestAPI,
  useGetLabTestsQuery,
  useGetTestByIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} from "./LabTestAPI";
