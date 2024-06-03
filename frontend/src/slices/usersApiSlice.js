import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  usersApiSlice;
