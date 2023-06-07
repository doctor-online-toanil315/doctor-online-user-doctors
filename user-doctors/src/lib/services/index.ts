export { AuthAPI, useGetMeQuery, useLazyGetMeQuery } from "./AuthAPI";
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
  useGetDoctorEventsQuery,
  useGetDoctorWorkingTimeQuery,
} from "./DoctorAPI";
export {
  AppointmentAPI,
  useGetAppointmentByUserQuery,
  useAddAppointmentMutation,
  useGetAppointmentByDoctorQuery,
  useLazyGetAppointmentByDoctorQuery,
} from "./AppointmentAPI";
export { NotificationAPI, useGetNotificationsQuery } from "./NotificationAPI";
export {
  PaymentAPI,
  useCreatePaymentUrlMutation,
  useLazyConvertCurrencyQuery,
} from "./PaymentAPI";
