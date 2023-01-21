import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const ConfigAPI = createApi({
  reducerPath: 'ConfigAPI',
  baseQuery,
  endpoints: (builder) => ({
    getCalculateWorkingDate: builder.mutation({
      query: (params) => ({
        url: 'config/times/calculateWorkingDate',
        method: 'GET',
        params
      })
    })
  })
});

export const { useGetCalculateWorkingDateMutation } = ConfigAPI;
