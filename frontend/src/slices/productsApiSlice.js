import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Ensure that useGetProductsQuery is included in the exported object
export const { useGetProductsQuery } = productsApiSlice;
