import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, SignUpRequest } from "src/lib/types/AuthTypes";
import { AuthResponse } from "src/lib/types/Responses";
import { baseQuery } from "./baseQuery";

const BASE_URL = "/auth";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: `${BASE_URL}/signin`,
        body,
        method: "POST",
      }),
    }),
    signUp: builder.mutation<void, SignUpRequest>({
      query: (body) => ({
        url: `${BASE_URL}/signup`,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = AuthAPI;
