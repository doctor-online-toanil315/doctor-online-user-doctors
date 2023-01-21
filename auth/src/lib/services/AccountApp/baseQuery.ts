import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "@nexthcm/common";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env["API_ACCOUNT_URL"],
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
