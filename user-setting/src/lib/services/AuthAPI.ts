import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiResponseImpl,
  UpdatePasswordType,
  UpdateUserType,
  UserType,
} from "../types";
import { baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/auth";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponseImpl<UserType>, void>({
      query: () => ({
        url: `${BASE_URL}/get-me`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<void, UpdateUserType>({
      query: (body) => ({
        url: `${BASE_URL}/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation<void, UpdatePasswordType>({
      query: (body) => ({
        url: `${BASE_URL}/update-password`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = AuthAPI;
