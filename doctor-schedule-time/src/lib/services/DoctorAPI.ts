import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  UserType,
  ApiResponseWithPaginate,
  WorkingTimeType,
  UpdateWorkingType,
} from "../types";
import {
  CreateDoctorAchievement,
  CreateDoctorEducationType,
  CreateDoctorWorkExperience,
  DoctorAchievement,
  DoctorEducation,
  DoctorReview,
  DoctorReviewDto,
  DoctorType,
  DoctorWorkExperience,
  UpdateDoctorType,
} from "../types/DoctorType";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/doctors";

export const DoctorAPI = createApi({
  reducerPath: "DoctorAPI",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Review", "Doctor", "WorkingTime"],
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
      providesTags: ["Doctor"],
    }),

    getDoctorEducation: builder.query<
      ApiResponseImpl<DoctorEducation[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/education`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),

    getDoctorAchievements: builder.query<
      ApiResponseImpl<DoctorAchievement[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/achievements`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),

    getDoctorWorkExperience: builder.query<
      ApiResponseImpl<DoctorWorkExperience[]>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/workExperience`,
        method: "GET",
      }),
      providesTags: ["Doctor"],
    }),

    getDoctorWorkingTime: builder.query<
      ApiResponseImpl<WorkingTimeType>,
      string
    >({
      query: (id) => ({
        url: `${BASE_URL}/${id}/working-times`,
        method: "GET",
      }),
      providesTags: ["WorkingTime"],
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

    updateDoctor: builder.mutation<void, UpdateDoctorType>({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),

    updateWorkingTime: builder.mutation<void, UpdateWorkingType>({
      query: ({ id, ...body }) => ({
        url: `${BASE_URL}/working-times/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["WorkingTime"],
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
  useUpdateDoctorMutation,
  useGetDoctorWorkingTimeQuery,
  useUpdateWorkingTimeMutation,
} = DoctorAPI;
