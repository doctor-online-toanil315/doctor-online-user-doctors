import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseWithPaginate,
  AppointmentType,
  BaseAppointmentType,
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
      ApiQueryType & { doctorId: string }
    >({
      query: ({ doctorId, ...params }) => ({
        url: `${BASE_URL}/list/doctor/${doctorId}`,
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
  }),
});

export const {
  useGetAppointmentByUserQuery,
  useAddAppointmentMutation,
  useGetAppointmentByDoctorQuery,
  useLazyGetAppointmentByDoctorQuery,
} = AppointmentAPI;
