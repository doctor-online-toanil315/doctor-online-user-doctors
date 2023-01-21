import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const WorkFromHomeAPI = createApi({
  reducerPath: 'WorkFromHomeAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WorkFromHomeAPI'],
  endpoints: (builder) => ({
    getWorkFromHome: builder.query({
      query: ({ ...params }) => ({
        url: 'wfh/me',
        method: 'GET',
        params
      }),
      providesTags: ['WorkFromHomeAPI']
    }),
    putWorkFromHome: builder.mutation({
      query: ({ body, id }) => ({
        url: `wfh/${id}`,
        method: 'PUT',
        body: {
          request: { nextState: body }
        }
      }),
      invalidatesTags: ['WorkFromHomeAPI']
    })
  })
});

export const { useGetWorkFromHomeQuery, usePutWorkFromHomeMutation } = WorkFromHomeAPI;
