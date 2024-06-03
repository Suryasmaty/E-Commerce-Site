import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

// Ensure that useGetProductsQuery is included in the exported object
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
