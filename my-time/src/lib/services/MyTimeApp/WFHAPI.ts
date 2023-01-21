import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { IWFHs } from '../../types';

export const WFHAPI = createApi({
  reducerPath: 'WFHAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WFH'],
  endpoints: (builder) => ({
    getWFH: builder.query<{ code: string; data: IWFHs }, any>({
      query: (params) => ({
        url: `/wfh`,
        params
      }),
      providesTags: ['WFH']
    }),
    postWFH: builder.mutation({
      query: (body) => ({
        url: `/wfh`,
        method: 'POST',
        body
      })
    }),
    updateStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `wfh/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['WFH']
    }),
    getOperationTransactionsWFH: builder.mutation({
      query: (params) => ({
        url: '/wfh/operation-transactions',
        method: 'GET',
        params
      })
    }),
    checkDuplicateRequestWFH: builder.mutation({
      query: (body) => ({
        url: '/wfh/check-duplicate-request',
        method: 'POST',
        body
      })
    }),
    checkDuplicateRequestOnsite: builder.mutation({
      query: (body) => ({
        url: '/outside/check-duplicate-request',
        method: 'POST',
        body
      })
    }),
    getWfhEscalate: builder.mutation({
      query: (params) => ({
        url: 'wfh/escalate',
        method: 'GET',
        params
      })
    })
  })
});

export const {
  useGetWFHQuery,
  useUpdateStatusMutation,
  useGetOperationTransactionsWFHMutation,
  usePostWFHMutation,
  useCheckDuplicateRequestWFHMutation,
  useCheckDuplicateRequestOnsiteMutation,
  useGetWfhEscalateMutation
} = WFHAPI;
