import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  UserType,
  ApiResponseWithPaginate,
} from "../types";
import {
  DoctorAchievement,
  DoctorEducation,
  DoctorReview,
  DoctorReviewDto,
  DoctorType,
  DoctorWorkExperience,
} from "../types/DoctorType";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/doctors";

export const DoctorAPI = createApi({
  reducerPath: "DoctorAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Review"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getDoctors: builder.query<
      ApiResponseWithPaginate<DoctorType[]>,
      ApiQueryType
    >({
      query: (params) => ({
        url: `${BASE_URL}`,
        params,
        method: "GET",
      }),
    }),

    getDoctorById: builder.query<ApiResponseImpl<DoctorType>, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
    }),

    getDoctorEducation: builder.query<
      ApiResponseImpl<DoctorEducation[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/education`,
        method: "GET",
      }),
    }),

    getDoctorAchievements: builder.query<
      ApiResponseImpl<DoctorAchievement[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/achievements`,
        method: "GET",
      }),
    }),

    getDoctorWorkExperience: builder.query<
      ApiResponseImpl<DoctorWorkExperience[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/workExperience`,
        method: "GET",
      }),
    }),

    getDoctorReviews: builder.query<ApiResponseImpl<DoctorReview[]>, string>({
      query: (id) => ({
        url: `${BASE_URL}/${id}/reviews`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    createDoctorReview: builder.mutation<void, DoctorReviewDto>({
      query: (body) => ({
        url: `${BASE_URL}/review`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useLazyGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorAchievementsQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
  useCreateDoctorReviewMutation,
  useGetDoctorReviewsQuery,
} = DoctorAPI;
