import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddSurveyType,
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
  SurveyType,
} from "../types";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/Surveys";

export const SurveyAPI = createApi({
  reducerPath: "SurveyAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Surveys"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getSurveys: builder.query<
      ApiResponseWithPaginate<SurveyType[]>,
      ApiQueryType
    >({
      query: (params) => ({
        url: `${BASE_URL}`,
        params,
        method: "GET",
      }),
      providesTags: ["Surveys"],
    }),

    getSurveyById: builder.query<ApiResponseImpl<SurveyType>, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Surveys"],
    }),

    addSurvey: builder.mutation<void, AddSurveyType>({
      query: (body) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Surveys"],
    }),

    deleteSurvey: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Surveys"],
    }),
  }),
});

export const {
  useGetSurveysQuery,
  useGetSurveyByIdQuery,
  useAddSurveyMutation,
  useDeleteSurveyMutation,
} = SurveyAPI;
