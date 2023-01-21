import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const MyTimeAPI = createApi({
  reducerPath: 'MyTimeAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getLeaves: builder.query({
      query: (params) => ({
        url: `/leaves`,
        params,
        method: 'GET'
      })
    }),
    getRemainingEntitlementByUserId: builder.query({
      query: ({ userId, ...restParams }) => ({
        url: `/leaves/remaining-entitlement-by-user-id/${userId}`,
        params: restParams,
        method: 'GET'
      })
    })
  })
});

export const { useGetLeavesQuery, useGetRemainingEntitlementByUserIdQuery } = MyTimeAPI;
