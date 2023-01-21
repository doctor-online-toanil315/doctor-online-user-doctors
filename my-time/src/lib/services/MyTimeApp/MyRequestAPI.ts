import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const MyRequestAPI = createApi({
  reducerPath: 'MyRequestAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['DataReq'],
  endpoints: (builder) => ({
    getMyRequest: builder.query({
      query: ({ type, params }) => ({
        url: `/${type}/me`,
        method: 'GET',
        params
      }),
      providesTags: ['DataReq']
    }),
    putMyRequest: builder.mutation({
      query: ({ type, body }) => ({
        url: `/${type}/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['DataReq']
    })
  })
});

export const { useGetMyRequestQuery, usePutMyRequestMutation } = MyRequestAPI;
