import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const PartialDayAPI = createApi({
  reducerPath: 'PartialDayAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['PartialDayAPI'],
  endpoints: (builder) => ({
    getPartialDay: builder.query({
      query: () => ({
        url: `partial-day-type`
      })
    })
  })
});

export const { useGetPartialDayQuery } = PartialDayAPI;
