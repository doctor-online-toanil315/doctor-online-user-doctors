import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const CheckInOutAPI = createApi({
  reducerPath: 'CheckInOutAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getStatus: builder.mutation({
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
      })
    })
  })
});

export const { useGetStatusMutation } = CheckInOutAPI;
