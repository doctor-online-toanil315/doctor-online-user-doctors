import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ApiQueryType,
  ApiResponseImpl,
  UserType,
  ApiResponseWithPaginate,
} from "../types";
import {
  CreateDoctorType,
  DoctorAchievement,
  DoctorEducation,
  DoctorType,
  DoctorWorkExperience,
} from "../types/DoctorType";
import { baseQuery, baseQueryWithReAuth } from "./baseQuery";

const BASE_URL = "/doctors";

export const DoctorAPI = createApi({
  reducerPath: "DoctorAPI",
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 300,
  tagTypes: ["Doctors"],
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
      providesTags: ["Doctors"],
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

    addDoctor: builder.mutation<void, CreateDoctorType>({
      query: (body) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Doctors"],
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
  useAddDoctorMutation,
} = DoctorAPI;
