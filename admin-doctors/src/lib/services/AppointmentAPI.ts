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
} from "../types";
import { baseQuery } from "./baseQuery";

const APPOINTMENT_BASE_URL = "/appointments";
const CONSULTATION_BASE_URL = "/consultions";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQuery,
  tagTypes: ["Appointment"],
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
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
} = AppointmentAPI;
