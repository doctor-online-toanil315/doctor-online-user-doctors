import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const WorkingHoursAPI = createApi({
  reducerPath: 'WorkingHoursAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getWorkingHours: builder.mutation({
      query: (params) => ({
        url: `working-hours`,
        method: 'GET',
        params
      })
    })
  })
});

export const { useGetWorkingHoursMutation } = WorkingHoursAPI;
