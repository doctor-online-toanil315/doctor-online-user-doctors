import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  CreatePaymentUrl,
  NotificationType,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/payment";

export const PaymentAPI = createApi({
  reducerPath: "PaymentAPI",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createPaymentUrl: builder.mutation<string, CreatePaymentUrl>({
      query: (body) => ({
        url: `${BASE_URL}/create-payment-url`,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreatePaymentUrlMutation } = PaymentAPI;
