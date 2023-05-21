import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  UserType,
  ApiResponseWithPaginate,
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
  tagTypes: ["Review", "Doctor"],
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

    createDoctorEducation: builder.mutation<void, CreateDoctorEducationType>({
      query: (body) => ({
        url: `${BASE_URL}/education`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),

    createDoctorAchievement: builder.mutation<void, CreateDoctorAchievement>({
      query: (body) => ({
        url: `${BASE_URL}/achievements`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),

    createDoctorWorkExperience: builder.mutation<
      void,
      CreateDoctorWorkExperience
    >({
      query: (body) => ({
        url: `${BASE_URL}/workExperience`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctorEducation: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctorAchievement: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/achievement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),

    deleteDoctorWorkExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `${BASE_URL}/workExperience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
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
  useDeleteDoctorAchievementMutation,
  useDeleteDoctorEducationMutation,
  useDeleteDoctorWorkExperienceMutation,
  useCreateDoctorAchievementMutation,
  useCreateDoctorEducationMutation,
  useCreateDoctorWorkExperienceMutation,
} = DoctorAPI;
