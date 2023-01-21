import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const StatesAPI = createApi({
  reducerPath: 'StatesAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: (params) => ({
        url: `/states`,
        params,
        method: 'GET'
      })
    }),
    getStatuses: builder.mutation({
      query: (params) => ({
        url: `/states/v2`,
        params,
        method: 'GET'
      })
    }),
    getStatusByID: builder.query({
      query: ({ id }) => ({
        url: `/states/by-ids/${id}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetStatusQuery, useGetStatusesMutation, useGetStatusByIDQuery } = StatesAPI;
