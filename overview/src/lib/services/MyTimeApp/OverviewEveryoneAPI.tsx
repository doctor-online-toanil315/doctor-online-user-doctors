import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const OverviewEveryoneAPI = createApi({
  reducerPath: 'OverviewEveryoneAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getLeaveTypes: builder.query({
      query: (params) => ({
        url: `/calendars/leave-types`,
        params,
        method: 'GET'
      })
    }),
    getLeavesEveryone: builder.query({
      query: (params) => ({
        url: `/calendars/leaves`,
        params,
        method: 'GET'
      })
    }),
    putActions: builder.mutation({
      query: (params) => ({
        url: `/leaves/${params.idUser}`,
        method: 'PUT',
        body: { request: { nextState: params.idAction } }
      })
    })
  })
});

export const { useGetLeaveTypesQuery, useGetLeavesEveryoneQuery, usePutActionsMutation } =
  OverviewEveryoneAPI;
