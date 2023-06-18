import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseWithPaginate,
  AppointmentQueryType,
  AppointmentType,
  BaseAppointmentType,
  PatientType,
  UpdateAppointmentStatus,
  UserType,
} from "../types";
import { baseQuery } from "./baseQuery";

const BASE_URL = "/appointments";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQuery,
  tagTypes: ["Appointment"],
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
    getAppointmentByUser: builder.query<
      ApiResponseWithPaginate<AppointmentType[]>,
      ApiQueryType & { userId: string }
    >({
      query: ({ userId, ...params }) => ({
        url: `${BASE_URL}/list/${userId}`,
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
        url: `${BASE_URL}/list/doctor/${doctorId}`,
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
        url: `${BASE_URL}/doctor/${doctorId}/patient`,
        params,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    addAppointment: builder.mutation<void, BaseAppointmentType>({
      query: (body) => ({
        url: `${BASE_URL}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),

    updateAppointment: builder.mutation<void, UpdateAppointmentStatus>({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}/${id}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Appointment"],
    }),
    getConsultationByDoctor: builder.query<number, string>({
      query: (doctorId: string) => ({
        url: `consultions/doctor/${doctorId}`,
        method: "GET",
      }),
    }),
    getPatientOverview: builder.query<
      { oldPatients: number; newPatients: number },
      void
    >({
      query: () => ({
        url: `${BASE_URL}/patient-overview`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useGetAppointmentByUserQuery,
  useAddAppointmentMutation,
  useGetAppointmentByDoctorQuery,
  useLazyGetAppointmentByDoctorQuery,
  useUpdateAppointmentMutation,
  useGetPatientOfDoctorQuery,
  useGetConsultationByDoctorQuery,
  useGetPatientOverviewQuery,
} = AppointmentAPI;
