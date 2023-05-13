import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseWithPaginate,
  AppointmentType,
} from "../types";
import { baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/appointments";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQueryWithReAuth,
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
    }),
  }),
});

export const { useGetAppointmentByUserQuery } = AppointmentAPI;
