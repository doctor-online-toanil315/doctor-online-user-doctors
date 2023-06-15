import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  NotificationType,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/notifications";

export const NotificationAPI = createApi({
  reducerPath: "NotificationAPI",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
    getNotifications: builder.query<
      ApiResponseWithPaginate<NotificationType[]>,
      ApiQueryType
    >({
      query: (params) => ({
        url: `${BASE_URL}`,
        params,
        method: "GET",
      }),
    }),
    seenNotification: builder.mutation<
      ApiResponseImpl<NotificationType>,
      string
    >({
      query: (notificationId: string) => ({
        url: `${BASE_URL}/${notificationId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = NotificationAPI;
