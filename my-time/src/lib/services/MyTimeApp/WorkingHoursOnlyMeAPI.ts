import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
export const WorkingHoursOnlyMeAPI = createApi({
  reducerPath: 'WorkingHoursOnlyMeAPI',
  baseQuery,
  tagTypes: ['WorkingHoursOnlyMe', 'TimeSheet'],
  endpoints: (builder) => ({
    getWorkingHoursOnlyMe: builder.query({
      query: (params) => ({
        url: '/working-hours',
        method: 'GET',
        params
      }),
      providesTags: ['WorkingHoursOnlyMe']
    }),

    postTimeSheetUpdate: builder.mutation({
      query: (body) => ({
        url: '/timesheet-updates',
        method: 'POST',
        body
      }),
      invalidatesTags: ['TimeSheet']
    })
  })
});

export const { useGetWorkingHoursOnlyMeQuery, usePostTimeSheetUpdateMutation } =
  WorkingHoursOnlyMeAPI;
