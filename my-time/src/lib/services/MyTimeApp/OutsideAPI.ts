import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const OutsideAPI = createApi({
  reducerPath: 'OutsideAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['outside'],

  endpoints: (builder) => ({
    postOutside: builder.mutation({
      query: (body) => ({
        url: `/outside`,
        method: 'POST',
        body
      })
    }),
    getOutside: builder.query({
      query: (params) => ({
        url: '/outside',
        method: 'GET',
        params
      }),
      providesTags: ['outside']
    }),
    updateOutside: builder.mutation({
      query: (body) => ({
        url: `/outside/${body.id}`,
        method: 'PUT',
        body: {
          request: {
            nextState: body.stateId
          }
        }
      }),
      invalidatesTags: ['outside']
    }),
    getOperationTransactions: builder.mutation({
      query: (params) => ({
        url: '/outside/operation-transactions',
        method: 'GET',
        params
      })
    })
  })
});

export const {
  useGetOutsideQuery,
  useUpdateOutsideMutation,
  usePostOutsideMutation,
  useGetOperationTransactionsMutation
} = OutsideAPI;
