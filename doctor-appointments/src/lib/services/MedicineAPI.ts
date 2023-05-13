import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiQueryType, ApiResponseWithPaginate, MedicineType } from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/medicines";

export const MedicineAPI = createApi({
  reducerPath: "MedicineAPI",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getMedicines: builder.query<
      ApiResponseWithPaginate<MedicineType[]>,
      ApiQueryType
    >({
      query: (params) => ({
        url: `${BASE_URL}`,
        params,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMedicinesQuery } = MedicineAPI;
