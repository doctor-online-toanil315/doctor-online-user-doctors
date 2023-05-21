export {
  AuthAPI,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} from "./AuthAPI";
export {
  DoctorAPI,
  useGetDoctorsQuery,
  useLazyGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorAchievementsQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
  useCreateDoctorReviewMutation,
  useGetDoctorReviewsQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorAchievementMutation,
  useDeleteDoctorEducationMutation,
  useDeleteDoctorWorkExperienceMutation,
  useCreateDoctorAchievementMutation,
  useCreateDoctorEducationMutation,
  useCreateDoctorWorkExperienceMutation,
} from "./DoctorAPI";
export {
  AppointmentAPI,
  useGetAppointmentByUserQuery,
  useAddAppointmentMutation,
  useGetAppointmentByDoctorQuery,
  useLazyGetAppointmentByDoctorQuery,
} from "./AppointmentAPI";
export { NotificationAPI, useGetNotificationsQuery } from "./NotificationAPI";
