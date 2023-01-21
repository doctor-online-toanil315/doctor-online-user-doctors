import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const MyTimeAPI = createApi({
  reducerPath: 'MyTimeAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (params) => ({
        url: `/leaves`,
        params,
        method: 'GET'
      })
    }),
    getWorkingHour: builder.query({
      query: (params) => ({
        url: `/working-hours`,
        params,
        method: 'GET'
      })
    })
  })
});

export const { useGetLeavesQuery, useGetWorkingHourQuery } = MyTimeAPI;
