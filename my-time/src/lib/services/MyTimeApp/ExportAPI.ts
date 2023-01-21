import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const ExportAPI = createApi({
  reducerPath: 'ExportAPI',
  baseQuery,
  endpoints: (builder) => ({
    export: builder.mutation({
      query: ({ type, params }) => ({
        url: `/${type}`,
        method: 'GET',
        params,
        responseHandler: (response) => response.blob()
      })
    })
  })
});

export const { useExportMutation } = ExportAPI;
