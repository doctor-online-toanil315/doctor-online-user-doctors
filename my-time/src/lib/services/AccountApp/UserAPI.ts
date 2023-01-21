import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const UserAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['UserAPI'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (payload) => ({
        url: `employees/${payload?.id}`
      })
    }),
    getUser: builder.mutation({
      query: (params) => ({
        url: 'users/v2',
        params,
        method: 'GET'
      })
    }),
    getDirectReport: builder.query({
      query: (params) => ({
        url: `users/direct_report/${params?.id}`
      })
    }),
    getUserOrganization: builder.query({
      query: (params) => ({
        url: 'user/organization',
        method: 'GET',
        params
      })
    })
  })
});

export const {
  useGetUserMutation,
  useGetDirectReportQuery,
  useGetUserOrganizationQuery,
  useGetUserByIdQuery
} = UserAPI;
