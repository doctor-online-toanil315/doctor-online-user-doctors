import { createApi } from "@reduxjs/toolkit/query/react";
import { BlogType, CreateBlogType } from "../types/BlogType";
import { baseQueryWithReAuth } from "./baseQuery";
import {
  ApiQueryType,
  ApiResponseImpl,
  ApiResponseWithPaginate,
} from "../types";

const BASE_URL = "/blogs";

export const BlogAPI = createApi({
  reducerPath: "BlogAPI",
  tagTypes: ["Blog"],
  baseQuery: baseQueryWithReAuth,
  keepUnusedDataFor: 500,
  endpoints: (builder) => ({
    createBlog: builder.mutation<void, CreateBlogType>({
      query: (body) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    getBlogsByDoctorId: builder.query<
      ApiResponseWithPaginate<BlogType[]>,
      ApiQueryType & { doctorId: string }
    >({
      query: ({ doctorId, ...params }) => ({
        url: `${BASE_URL}/doctor/${doctorId}`,
        method: "GET",
        params,
      }),
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query<ApiResponseImpl<BlogType>, string>({
      query: (blogId: string) => ({
        url: `${BASE_URL}/${blogId}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogsByDoctorIdQuery,
  useGetBlogByIdQuery,
} = BlogAPI;
