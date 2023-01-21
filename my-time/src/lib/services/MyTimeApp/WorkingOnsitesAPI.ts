import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const WorkingOnsitesAPI = createApi({
  reducerPath: 'WorkingOnsitesAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WorkingOnsitesAPI'],
  endpoints: (builder) => ({
    getWorkingOnsites: builder.query({
      query: ({ ...params }) => ({
        url: 'outside/me',
        method: 'GET',
        params
      }),
      providesTags: ['WorkingOnsitesAPI']
    }),
    putWorkingOnsites: builder.mutation({
      query: ({ body, id }) => ({
        url: `outside/${id}`,
        method: 'PUT',
        body: {
          request: { nextState: body }
        }
      }),
      invalidatesTags: ['WorkingOnsitesAPI']
    })
  })
});

export const { useGetWorkingOnsitesQuery, usePutWorkingOnsitesMutation } = WorkingOnsitesAPI;
