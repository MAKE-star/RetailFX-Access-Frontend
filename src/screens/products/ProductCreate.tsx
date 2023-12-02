"use client";
import React, { useEffect, useState } from "react";
import { TProductCreate } from "./types";
import { Button, FormInput } from "@/ui";
import {
  ProductsCreateBook,
  ProductsCreateCustomer,
  ProductsCreateHeader,
  ProductsCreateProduct,
  ProductsCreateSpot,
} from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useProductService } from "@/services/products";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
import { useRouter } from "next/navigation";
const ProductCreate = ({}) => {
  const { useCreateProduct, useProductsCategory } = useProductService();
  const { push } = useRouter();

  const [spot, setSpot] = useState(true);
  const [books, setBooks] = useState("");
  const [productType, setProductType] = useState("");
  const [proCat, setproCat] = useState([]);
  const [formA, setFormA] = useState(true);

  const {
    mutate: productMutate,
    isLoading: productLoading,
    isSuccess: productIsSuccess,
    isError: productIsError,
    error: productError,
    data: productData,
  } = useCreateProduct();
  const {
    data: productCategoryData,
    isLoading: productCategoryIsLoading,
    error: productCategoryError,
    isSuccess: productCategoryIsSuccess,
    refetch: productCategoryRefetch,
  } = useProductsCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TProductCreate>({
    defaultValues: {
      ref_ccy: "USD",
    },
  });
  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const onSubmit: SubmitHandler<TProductCreate> = async (data) =>
    productMutate(
      {
        ...data,
        product_type: productType,
        spot: spot ? "1" : "0",
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          setTimeout(() => {
            push("/products");
          }, 1000);
        },
      }
    );
  useEffect(() => {
    if (productCategoryData) {
      const proCatData = productCategoryData?.data?.rows?.map(
        (item: any, index: number) => {
          if (index == 0) setProductType(item.ID);
          return {
            label: item.CATEGORY,
            value: item.ID,
          };
        }
      );
      setproCat(proCatData);
    }
  }, [productCategoryData]);

  useEffect(() => {
    const selectedData = productCategoryData?.data?.rows?.find(
      (item: any) => productType == item.ID
    );
    setValue("show_forma", selectedData?.SHOW_FORMA);
    setValue("show_dorm", selectedData?.SHOW_DORM);
    setValue("show_allocation", selectedData?.SHOW_ALLOCATION);
  }, [productType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-2xl m-auto  mt-10">
      {/*<Button
        href="/products"
        variant="primary"
        className=" text-sm font-normal"
      >
        <i className="bi bi-chevron-left"></i>Products List
      </Button>
  */}
      <ProductsCreateHeader productLoading={productLoading} />
      <ProductsCreateProduct
        errors={errors}
        register={register}
        productType={productType}
        proCat={proCat}
        setProductType={setProductType}
      />
      <ProductsCreateBook
        errors={errors}
        register={register}
        books={books}
        setBooks={setBooks}
      />
      <ProductsCreateCustomer errors={errors} register={register} />
      <ProductsCreateSpot
        spot={spot}
        setSpot={setSpot}
        setFormA={setFormA}
        formA={formA}
      />
      <ToastContainer />
    </form>
  );
};

export default ProductCreate;
