import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiQueryType, ApiResponseWithPaginate, LabTest } from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/tests";

export const LabTestAPI = createApi({
  reducerPath: "LabTestAPI",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getLabTests: builder.query<
      ApiResponseWithPaginate<LabTest[]>,
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

export const { useGetLabTestsQuery } = LabTestAPI;
