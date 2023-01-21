import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StreetMapAPI = createApi({
  reducerPath: 'StreetMapAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nominatim.openstreetmap.org'
  }),
  endpoints: (builder) => ({
    getStreetMap: builder.mutation({
      query: (params) => ({
        url: '/reverse',
        method: 'GET',
        params
      })
    })
  })
});

export const { useGetStreetMapMutation } = StreetMapAPI;
