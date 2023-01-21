import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const OnSiteAPI = createApi({
  reducerPath: 'OnSiteAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['OnSiteAPI'],
  endpoints: (builder) => ({
    getOnSite: builder.query({
      query: () => ({
        url: 'office/onsite'
      })
    }),
    getOnsite: builder.mutation({
      query: () => ({
        url: 'office/onsite',
        method: 'GET'
      })
    })
  })
});

export const { useGetOnSiteQuery, useGetOnsiteMutation } = OnSiteAPI;
