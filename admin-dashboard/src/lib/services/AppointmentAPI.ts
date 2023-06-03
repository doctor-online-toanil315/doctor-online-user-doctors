import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddConsultationTestType,
  AddConsultationType,
  AddPrescriptionType,
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  AppointmentQueryType,
  AppointmentType,
  BaseAppointmentType,
  PatientType,
  UpdateAppointmentStatus,
  UpdateConsultationType,
  UserType,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const APPOINTMENT_BASE_URL = "/appointments";
const CONSULTATION_BASE_URL = "/consultions";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Appointment"],
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
    getAllAppointments: builder.query<
      ApiResponseWithPaginate<AppointmentType[]>,
      AppointmentQueryType
    >({
      query: (params) => ({
        url: `${APPOINTMENT_BASE_URL}/list`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    getAllIncome: builder.query<number, void>({
      query: () => ({
        url: `${APPOINTMENT_BASE_URL}/income`,
        method: "GET",
      }),
    }),

    getIncomeByMonths: builder.mutation<number[], number[][]>({
      query: (body) => ({
        url: `${APPOINTMENT_BASE_URL}/income-by-months`,
        method: "POST",
        body,
      }),
    }),

    getAllPatients: builder.query<
      ApiResponseWithPaginate<UserType[]>,
      AppointmentQueryType
    >({
      query: (params) => ({
        url: `${APPOINTMENT_BASE_URL}/list/patients`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    getPatientByMonths: builder.mutation<number[], number[][]>({
      query: (body) => ({
        url: `${APPOINTMENT_BASE_URL}/patient-by-months`,
        method: "POST",
        body,
      }),
    }),

    getPatientsOfDoctorByMonths: builder.mutation<
      number[],
      { months: number[][]; doctorId: string }
    >({
      query: (body) => ({
        url: `${APPOINTMENT_BASE_URL}/doctor/patient-by-months`,
        method: "POST",
        body,
      }),
    }),

    getReBookingRateByMonths: builder.mutation<number[], number[][]>({
      query: (body) => ({
        url: `${APPOINTMENT_BASE_URL}/re-Booking-rate`,
        method: "POST",
        body,
      }),
    }),

    getAppointmentById: builder.query<ApiResponseImpl<AppointmentType>, string>(
      {
        query: (appointmentId: string) => ({
          url: `${APPOINTMENT_BASE_URL}/${appointmentId}`,
          method: "GET",
        }),
        providesTags: (result, error, appointmentId) => [
          { type: "Appointment", id: appointmentId },
        ],
      }
    ),

    getAppointmentByUser: builder.query<
      ApiResponseWithPaginate<AppointmentType[]>,
      AppointmentQueryType & { userId: string }
    >({
      query: ({ userId, ...params }) => ({
        url: `${APPOINTMENT_BASE_URL}/list/${userId}`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    getAppointmentByDoctor: builder.query<
      ApiResponseWithPaginate<AppointmentType[]>,
      AppointmentQueryType & { doctorId: string }
    >({
      query: ({ doctorId, ...params }) => ({
        url: `${APPOINTMENT_BASE_URL}/list/doctor/${doctorId}`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    getPatientOfDoctor: builder.query<
      ApiResponseWithPaginate<PatientType[]>,
      AppointmentQueryType & { doctorId: string }
    >({
      query: ({ doctorId, ...params }) => ({
        url: `${APPOINTMENT_BASE_URL}/doctor/${doctorId}/patient`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    getPatientOverview: builder.query<
      { oldPatients: number; newPatients: number },
      void
    >({
      query: () => ({
        url: `${APPOINTMENT_BASE_URL}/patient-overview`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    addAppointment: builder.mutation<void, BaseAppointmentType>({
      query: (body) => ({
        url: `${APPOINTMENT_BASE_URL}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),

    updateAppointment: builder.mutation<void, UpdateAppointmentStatus>({
      query: ({ id, ...body }) => ({
        url: `${APPOINTMENT_BASE_URL}/${id}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),

    addConsultation: builder.mutation<void, AddConsultationType>({
      query: (body) => ({
        url: `${CONSULTATION_BASE_URL}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),

    updateConsultation: builder.mutation<void, UpdateConsultationType>({
      query: (body) => ({
        url: `${CONSULTATION_BASE_URL}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["Appointment"],
    }),

    addMedicine: builder.mutation<void, AddPrescriptionType>({
      query: (body) => ({
        url: `${CONSULTATION_BASE_URL}/add-prescription`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),

    addTest: builder.mutation<void, AddConsultationTestType>({
      query: (body) => ({
        url: `${CONSULTATION_BASE_URL}/add-test`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
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
  useGetAllAppointmentsQuery,
  useGetAllPatientsQuery,
  useGetAllIncomeQuery,
  useGetIncomeByMonthsMutation,
  useGetPatientByMonthsMutation,
  useGetPatientsOfDoctorByMonthsMutation,
  useGetReBookingRateByMonthsMutation,
  useGetPatientOverviewQuery,
} = AppointmentAPI;
