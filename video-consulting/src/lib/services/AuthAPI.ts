import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponseImpl, UserType } from "../types";
import { baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/auth";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponseImpl<UserType>, void>({
      query: () => ({
        url: `${BASE_URL}/get-me`,
        method: "GET",
      }),
    }),
    getUserById: builder.query<ApiResponseImpl<UserType>, string>({
      query: (userId: string) => ({
        url: `${BASE_URL}/get-by-id/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useGetUserByIdQuery } =
  AuthAPI;
