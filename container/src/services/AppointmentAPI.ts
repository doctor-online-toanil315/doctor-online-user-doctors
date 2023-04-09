import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseWithPaginate,
  AppointmentType,
} from "../types";
import { baseQuery } from "./baseQuery";

const BASE_URL = "/appointments";

export const AppointmentAPI = createApi({
  reducerPath: "AppointmentAPI",
  baseQuery: baseQuery,
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
