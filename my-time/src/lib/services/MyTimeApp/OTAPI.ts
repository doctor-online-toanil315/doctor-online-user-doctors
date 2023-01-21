import { createApi } from '@reduxjs/toolkit/query/react';
import { method } from 'lodash';
import { baseQueryWithReAuth } from './baseQuery';

export const OTAPI = createApi({
  reducerPath: 'OTAPI',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['OTAPI'],
  endpoints: (builder) => ({
    postOTRequest: builder.mutation({
      query: (body) => ({
        url: `/ot-requests`,
        method: 'POST',
        body
      })
    })
  })
});

export const { usePostOTRequestMutation } = OTAPI;
