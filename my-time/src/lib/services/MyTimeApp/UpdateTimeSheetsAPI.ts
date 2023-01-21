import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const UpdateTimeSheetsAPI = createApi({
  reducerPath: 'UpdateTimeSheetsAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['UpdateTimeSheetsAPI'],
  endpoints: (builder) => ({
    getUpdateTimeSheets: builder.query({
      query: ({ ...params }) => ({
        url: 'timesheet-updates/me',
        method: 'GET',
        params
      }),
      providesTags: ['UpdateTimeSheetsAPI']
    }),
    putUpdateTimeSheets: builder.mutation({
      query: ({ body, id }) => ({
        url: `timesheet-updates/${id}`,
        method: 'PUT',
        body: {
          request: { nextState: body }
        }
      }),
      invalidatesTags: ['UpdateTimeSheetsAPI']
    })
  })
});

export const { useGetUpdateTimeSheetsQuery, usePutUpdateTimeSheetsMutation } = UpdateTimeSheetsAPI;
