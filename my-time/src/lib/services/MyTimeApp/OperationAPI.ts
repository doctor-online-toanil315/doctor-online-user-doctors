import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const OperationAPI = createApi({
  reducerPath: 'OperationAPI',
  baseQuery,
  endpoints: (builder) => ({
    operationTransactions: builder.mutation({
      query: ({ type, params }) => ({
        url: `/${type}/operation-transactions`,
        method: 'GET',
        params
      })
    })
  })
});

export const { useOperationTransactionsMutation } = OperationAPI;
