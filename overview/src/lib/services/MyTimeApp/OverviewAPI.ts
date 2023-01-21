import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const OverviewAPI = createApi({
  reducerPath: 'OverviewAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Status'],
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => ({
        url: `status-check-in-out`,
        method: 'GET'
      }),
      providesTags: ['Status']
    }),
    callGetStatus: builder.mutation({
      query: () => ({
        url: `status-check-in-out`,
        method: 'GET'
      })
    }),
    postCheck: builder.mutation({
      query: (body) => ({
        url: `check-in-out`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Status']
    }),
    getWorkingHours: builder.query({
      query: (params) => ({
        url: `working-hours`,
        method: 'GET',
        params
      }),
      providesTags: ['Status']
    }),
    getTotalWorkingDay: builder.mutation({
      query: () => ({
        url: `working-hours/display-total-working-day-per-month`,
        method: 'GET'
      })
    })
  })
});

export const {
  useCallGetStatusMutation,
  useGetStatusQuery,
  usePostCheckMutation,
  useGetWorkingHoursQuery,
  useGetTotalWorkingDayMutation
} = OverviewAPI;
