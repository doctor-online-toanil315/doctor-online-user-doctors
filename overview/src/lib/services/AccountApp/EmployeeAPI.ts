import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const EmployeeAPI = createApi({
  reducerPath: 'EmployeeAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: ({ id }) => ({
        url: `employees/${id}`
      })
    })
  })
});

export const { useGetEmployeeQuery } = EmployeeAPI;
