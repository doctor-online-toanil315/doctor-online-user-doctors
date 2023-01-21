import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const StateByProcessAPI = createApi({
  reducerPath: 'StateByProcessAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['StateByProcessAPI'],
  endpoints: (builder) => ({
    getState: builder.query({
      query: (params) => ({
        url: `configurations/requests/states-by-process`,
        params: params
      })
    })
  })
});

export const { useGetStateQuery } = StateByProcessAPI;
