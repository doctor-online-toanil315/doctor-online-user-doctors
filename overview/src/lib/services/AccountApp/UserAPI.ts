import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const UserAPI = createApi({
  reducerPath: 'UserAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['UserAPI'],
  endpoints: (builder) => ({
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
    })
  })
});

export const { useGetUserMutation, useGetDirectReportQuery } = UserAPI;
