"use client";

import { useQuery, useMutation } from "react-query";
import productService from "./products";
import {
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_CATEGORY,
  SEARCH_PRODUCT,
} from "./constants";
import { TUseMutationOption } from "../types";

const useProductService = () => {
  const useGetProducts = (page: number) =>
    useQuery([GET_PRODUCTS, page], () => productService.getProducts(page));
  const useGetSingleProduct = (productId: any) =>
    useQuery([GET_SINGLE_PRODUCT, productId], () =>
      productService.getSingleProduct(productId)
    );
  const useCreateProduct = (options?: TUseMutationOption) =>
    useMutation(CREATE_PRODUCT, productService.createProduct, options);
  const useEditProduct = (options?: TUseMutationOption) =>
    useMutation(EDIT_PRODUCT, productService.editProduct, options);
  const useDeleteProduct = (options?: TUseMutationOption) =>
    useMutation(DELETE_PRODUCT, productService.deleteProduct, options);
  const useProductsCategory = () =>
    useQuery(PRODUCT_CATEGORY, productService.getProductsCategory);
  const useSearchProduct = (search: any) =>
    useQuery(
      SEARCH_PRODUCT,
      () => productService.searchProduct(search),
      search
    );
  return {
    useGetProducts,
    useGetSingleProduct,
    useCreateProduct,
    useEditProduct,
    useDeleteProduct,
    useProductsCategory,
    useSearchProduct,
  };
};

export default useProductService;
