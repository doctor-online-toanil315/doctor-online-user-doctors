import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const DetailModalAPI = createApi({
  reducerPath: 'DetailModalAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Detail', 'Comment', 'History', 'DataReq'],
  endpoints: (builder) => ({
    getDetail: builder.query({
      query: ({ url, ...params }) => ({
        url: `/${url}`,
        params
      }),
      providesTags: ['Detail']
    }),
    getHistory: builder.query({
      query: (params) => ({
        url: `/tracking-history/process`,
        params
      }),
      providesTags: ['History']
    }),
    getComment: builder.query({
      query: (params) => ({
        url: `/comments-common`,
        params
      }),
      providesTags: ['Comment']
    }),
    getEscalate: builder.query({
      query: ({ id, type, ...params }) => ({
        url: `${type}/get-escalate-user-by-user-id/${id}`,
        params
      })
    }),
    postEscalate: builder.mutation({
      query: ({ type, ...body }) => ({
        url: `${type}/change-assignee`,
        body,
        method: 'POST'
      }),
      invalidatesTags: ['Detail']
    }),
    putDetail: builder.mutation({
      query: ({ url, ...body }) => ({
        url: `/${url}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Detail', 'History', 'DataReq']
    }),
    postComment: builder.mutation({
      query: (body) => ({
        url: `/comments-common`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Comment']
    }),
    putComment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/comments-common/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Comment']
    }),
    getRequestManagement: builder.query({
      query: ({ type, params }) => ({
        url: `/${type}`,
        method: 'GET',
        params
      }),
      providesTags: ['DataReq']
    }),
    putRequestManagement: builder.mutation({
      query: ({ type, body }) => ({
        url: `/${type}/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['DataReq']
    }),
    bulkApprove: builder.mutation({
      query: ({ type, body }) => ({
        url: `/${type}/bulk-approve`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['DataReq']
    })
  })
});

export const {
  useGetDetailQuery,
  useGetHistoryQuery,
  useGetCommentQuery,
  usePutDetailMutation,
  usePostCommentMutation,
  usePutCommentMutation,
  useGetEscalateQuery,
  usePostEscalateMutation,
  usePutRequestManagementMutation,
  useGetRequestManagementQuery,
  useBulkApproveMutation
} = DetailModalAPI;
