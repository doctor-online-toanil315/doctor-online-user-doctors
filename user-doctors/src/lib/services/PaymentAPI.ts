import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  CreatePaymentUrl,
  CurrencyConversionParams,
  CurrencyConversionResult,
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
        url: `${BASE_URL}/create_payment_url`,
        body,
        method: "POST",
      }),
    }),
    convertCurrency: builder.query<
      CurrencyConversionResult,
      CurrencyConversionParams
    >({
      query: (params) => ({
        url: `https://api.getgeoapi.com/v2/currency/convert`,
        params,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentUrlMutation, useLazyConvertCurrencyQuery } =
  PaymentAPI;
