import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  AppointmentQueryType,
  AppointmentType,
  BaseAppointmentType,
  PatientType,
  UpdateAppointmentStatus,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/appointments";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Appointment"],
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
    getAppointmentById: builder.query<ApiResponseImpl<AppointmentType>, string>(
      {
        query: (appointmentId: string) => ({
          url: `${BASE_URL}/${appointmentId}`,
          method: "GET",
        }),
        providesTags: (result, error, appointmentId) => [
          { type: "Appointment", id: appointmentId },
        ],
      }
    ),

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
} = AppointmentAPI;
