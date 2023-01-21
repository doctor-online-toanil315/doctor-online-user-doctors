import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const WorkingAfterHourssAPI = createApi({
  reducerPath: 'WorkingAfterHourssAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['WorkingAfterHourssAPI'],
  endpoints: (builder) => ({
    getWorkingAfterHourss: builder.query({
      query: ({ ...params }) => ({
        url: 'ot-requests/me',
        method: 'GET',
        params
      }),
      providesTags: ['WorkingAfterHourssAPI']
    }),
    putWorkingAfterHourss: builder.mutation({
      query: ({ body, id }) => ({
        url: `ot-requests/${id}`,
        method: 'PUT',
        body: {
          request: { nextState: body }
        }
      }),
      invalidatesTags: ['WorkingAfterHourssAPI']
    })
  })
});

export const { useGetWorkingAfterHourssQuery, usePutWorkingAfterHourssMutation } =
  WorkingAfterHourssAPI;
