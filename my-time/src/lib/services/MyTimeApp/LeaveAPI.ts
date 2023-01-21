import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const LeaveAPI = createApi({
  reducerPath: 'LeaveAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Leave'],
  endpoints: (builder) => ({
    getLeave: builder.query({
      query: (params) => ({
        url: '/leaves',
        method: 'GET',
        params
      }),
      providesTags: ['Leave']
    }),
    putLeave: builder.mutation({
      query: ({ body, id }) => ({
        url: `/leaves/${id}`,
        method: 'PUT',
        body: {
          request: { nextState: body }
        }
      }),
      invalidatesTags: ['Leave']
    }),
    getLeaveRemaining: builder.query({
      query: ({ id, ...params }) => ({
        url: `leaves/remaining-entitlement-by-user-id/${id}`,
        params
      })
    }),
    getLeaveRemainingEntitlement: builder.mutation({
      query: ({ id, ...params }) => ({
        url: `leaves/remaining-entitlement-by-user-id/${id}`,
        method: 'GET',
        params
      })
    }),
    postLeave: builder.mutation({
      query: (body) => ({
        url: `/leaves`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Leave']
    }),
    exportLeave: builder.mutation({
      query: ({ type, params }) => ({
        url: `/leaves/${type}`,
        method: 'GET',
        params,
        responseHandler: (response) => response.blob()
      })
    }),
    getMyLeave: builder.query({
      query: (params) => ({
        url: `/leaves/me`,
        method: 'GET',
        params
      }),
      providesTags: ['Leave']
    })
  })
});

export const {
  useGetLeaveQuery,
  usePutLeaveMutation,
  useGetLeaveRemainingQuery,
  useGetLeaveRemainingEntitlementMutation,
  usePostLeaveMutation,
  useExportLeaveMutation,
  useGetMyLeaveQuery
} = LeaveAPI;
