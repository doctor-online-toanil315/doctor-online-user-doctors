import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const WorkingHoursAPI = createApi({
  reducerPath: 'WorkingHours',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WorkingHours', 'TimeSheet'],
  endpoints: (builder) => ({
    postDataCrossCheck: builder.mutation({
      query: (body) => ({
        url: `working-hours/preview-import-data-cross-check`,
        body,
        method: 'POST',
        responseHandler: (response) => response.text()
      })
    }),
    getWorkingHoursEveryone: builder.query({
      query: (params) => ({
        url: `working-hours-everyone`,
        params
      }),
      providesTags: ['WorkingHours']
    }),
    getWorkingHoursOnlyMe: builder.query({
      query: (params) => ({
        url: '/working-hours',
        params
      }),
      providesTags: ['WorkingHours']
    }),
    getFileExport: builder.mutation({
      query: (params) => ({
        url: `working-hours-everyone/export`,
        params,
        method: 'GET',
        responseHandler: (response) => response.blob()
      })
    }),
    postTimeSheetUpdate: builder.mutation({
      query: (body) => ({
        url: '/timesheet-updates',
        method: 'POST',
        body
      }),
      invalidatesTags: ['TimeSheet']
    }),

    getTotalWorkingDay: builder.query({
      query: () => ({
        url: `working-hours/display-total-working-day-per-month`,
        method: 'GET'
      })
    }),
    postProcessDataCrossCheck: builder.mutation({
      query: (body) => ({
        url: '/working-hours/process-data-cross-check',
        method: 'POST',
        body
      })
    })
  })
});

export const {
  usePostDataCrossCheckMutation,
  useGetWorkingHoursOnlyMeQuery,
  useLazyGetWorkingHoursOnlyMeQuery,
  useGetWorkingHoursEveryoneQuery,
  useGetFileExportMutation,
  usePostTimeSheetUpdateMutation,
  useGetTotalWorkingDayQuery,
  usePostProcessDataCrossCheckMutation
} = WorkingHoursAPI;
