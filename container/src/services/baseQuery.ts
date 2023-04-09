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

// export const baseQueryWithReAuth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     const refreshArgs = {
//       url: "/auth/refresh",
//       body: {
//         refreshToken: localStorage.getItem("refresh_token"),
//       },
//       method: "POST",
//     };

//     const { data }: { [key: string]: any } = await baseQuery(
//       refreshArgs,
//       api,
//       extraOptions
//     );
//     if (data) {
//       sessionStorage.setItem(ACCESS_TOKEN, data.access_token);
//     }
//     result = await baseQuery(args, api, extraOptions);
//   }
//   return result;
// };
