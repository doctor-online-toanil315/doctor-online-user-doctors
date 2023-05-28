import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  CreateLabTest,
  LabTest,
  UpdateLabTest,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/tests";

export const LabTestAPI = createApi({
  reducerPath: "LabTestAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Tests"],
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
      providesTags: ["Tests"],
    }),

    getTestById: builder.query<ApiResponseImpl<LabTest>, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Tests"],
    }),

    createTest: builder.mutation<void, CreateLabTest>({
      query: (body) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tests"],
    }),

    updateTest: builder.mutation<void, UpdateLabTest>({
      query: ({ id, ...restBody }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body: restBody,
      }),
      invalidatesTags: ["Tests"],
    }),

    deleteTest: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"],
    }),
  }),
});

export const {
  useGetLabTestsQuery,
  useGetTestByIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = LabTestAPI;
