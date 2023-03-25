import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "doctor-online-common";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env["API_URL"],
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
