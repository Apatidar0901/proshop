import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5, // Cache for 5 seconds
    }),
    getProductById: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
      keepUnusedDataFor: 5, // Cache for 5 seconds
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
