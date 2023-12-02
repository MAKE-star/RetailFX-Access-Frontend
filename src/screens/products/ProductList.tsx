"use client";
import React, { useEffect, useState } from "react";
import { TProductList } from "./types";
import {
  ProductsListHeader,
  ProductsListTableBody,
  ProductsListTableHeader,
} from "@/components";
import { useProductService } from "@/services/products";
import { SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { option } from "@/lib";

const ProductList = ({}: TProductList) => {
  const { useGetProducts, useDeleteProduct } = useProductService();
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const {
    data: productData,
    isLoading: productIsLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProducts(page);
  const {
    mutate: productMutate,
    isLoading: productLoading,
    isSuccess: productIsSuccess,
  } = useDeleteProduct();

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };

  const onSubmit = async () => {
    selectedItems?.map((item) => {
      productMutate(item, {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          productRefetch();
        },
      });
    });
  };
  useEffect(() => {
    if (productData) {
      setCount(productData?.data?.count);
      const data = productData?.data?.rows?.map((item: any) => {
        return {
          ...item,
          checked: false,
        };
      });
      setProductsData(data);
    }
  }, [productData]);
  return (
    <div>
      <div className=" px-6 py-3">
        <ProductsListHeader
          productsData={productsData}
          onSubmit={onSubmit}
          selectedItems={selectedItems}
          count={count}
          setPage={setPage}
          page={page}
        />
        <table className=" mt-4 w-full">
          <thead className="min-w-full border-b-[1.5px] border-t-[1.5px] border-gray-200 ">
            <ProductsListTableHeader />
          </thead>
          <tbody>
            <ProductsListTableBody
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              productsList={productsData}
            />
          </tbody>
        </table>
        <ToastContainer />
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem" }}>Total Products Added:  {count}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
