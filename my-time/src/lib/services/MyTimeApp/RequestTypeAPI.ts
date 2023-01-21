import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const RequestTypeAPI = createApi({
  reducerPath: 'RequestTypeAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getRequestType: builder.query({
      query: ({ type, ...params }) => ({
        url: `/${type}`,
        method: 'GET',
        params
      })
    }),
    getRequestTypeById: builder.query({
      query: ({ type, id }) => ({
        url: `/${type}/${id}`,
        method: 'GET'
      })
    }),
    putRequestType: builder.mutation({
      query: ({ type, ...body }) => ({
        url: `/${type}/${body.id}`,
        method: 'PUT',
        body
      })
    }),
    changeAssignee: builder.mutation({
      query: ({ type, ...body }) => ({
        url: `/${type}/change-assignee`,
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useGetRequestTypeQuery,
  useGetRequestTypeByIdQuery,
  usePutRequestTypeMutation,
  useChangeAssigneeMutation
} = RequestTypeAPI;
