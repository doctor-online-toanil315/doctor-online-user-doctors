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
    })
  })
});

export const { useLoginMutation } = KeycloakAPI;
