import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddMedicineType,
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  MedicineType,
  UpdateMedicineType,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/medicines";

export const MedicineAPI = createApi({
  reducerPath: "MedicineAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Medicines"],
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
      providesTags: ["Medicines"],
    }),

    getMedicineById: builder.query<ApiResponseImpl<MedicineType>, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Medicines"],
    }),

    addMedicine: builder.mutation<void, AddMedicineType>({
      query: (body) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Medicines"],
    }),

    updateMedicine: builder.mutation<void, UpdateMedicineType>({
      query: ({ id, ...restBody }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body: restBody,
      }),
      invalidatesTags: ["Medicines"],
    }),

    deleteMedicine: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicines"],
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = MedicineAPI;
