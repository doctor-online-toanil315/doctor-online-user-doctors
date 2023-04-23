import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { ACCESS_TOKEN } from "../constants";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env["API_URL"],
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    window.location.href = `http://127.0.0.1:5173/login?from=${window.location.href}`;
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};
