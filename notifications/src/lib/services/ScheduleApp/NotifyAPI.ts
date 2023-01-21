import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';
import { NotificationSettings } from '../../types';

export const NotifyAPI = createApi({
  reducerPath: 'NotifyAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getListSetting: builder.query<NotificationSettings[], Record<string, never>>({
      query: () => ({
        url: '/notify/list-setting',
        method: 'GET'
      })
    }),
    postSettings: builder.mutation({
      query: (body) => ({
        url: '/notify/setting',
        method: 'POST',
        body
      })
    })
  })
});

export const { useGetListSettingQuery, usePostSettingsMutation } = NotifyAPI;
