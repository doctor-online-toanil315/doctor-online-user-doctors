import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const StoreAPI = createApi({
  reducerPath: 'StoreAPI',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getFileStore: builder.query({
      query: (params) => ({
        url: 'store/file/get',
        params,
        responseHandler: (response) => {
          return response.blob().then((myBlob) => {
            return new Promise((resolve, _) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(myBlob);
            });
          });
        }
      })
    }),
    postFileStore: builder.mutation({
      query: (body) => ({
        url: 'store/file/upload',
        method: 'POST',
        body,
        responseHandler: (response) => response.text()
      })
    })
  })
});

export const { useGetFileStoreQuery, usePostFileStoreMutation } = StoreAPI;
