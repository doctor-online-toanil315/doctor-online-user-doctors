import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const KeycloakAPI = createApi({
  reducerPath: 'KeycloakAPI',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth',
        body,
        method: 'POST'
      })
    }),
    preFlight: builder.mutation({
      query: (body) => ({
        url: '/auth/pre-flight',
        body,
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation, usePreFlightMutation } = KeycloakAPI;
