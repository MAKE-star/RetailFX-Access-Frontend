"use client";
import React, { useEffect, useState } from "react";
import { TProductCreate, TProductEdit } from "./types";
import {
  ProductsCreateBook,
  ProductsCreateCustomer,
  ProductsCreateHeader,
  ProductsCreateProduct,
  ProductsCreateSpot,
} from "@/components";
import { Button } from "@/ui";
import { useProductService } from "@/services/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
const ProductEdit = ({}: TProductEdit) => {
  const {
    useCreateProduct,
    useGetSingleProduct,
    useEditProduct,
    useProductsCategory,
  } = useProductService();
  const { push } = useRouter();

  const params = useParams();
  const { productId } = params;
  const {
    data: singleProductData,
    isLoading: singleProductIsLoading,
    error: singleProductError,
    isSuccess: singleProductIsSuccess,
    refetch: singleProductRefetch,
  } = useGetSingleProduct(productId);
  const {
    data: productCategoryData,
    isLoading: productCategoryIsLoading,
    error: productCategoryError,
    isSuccess: productCategoryIsSuccess,
    refetch: productCategoryRefetch,
  } = useProductsCategory();
  const [spot, setSpot] = useState(true);
  const [formA, setFormA] = useState(true);
  const [books, setBooks] = useState("");
  const [productType, setProductType] = useState("");
  const [productsData, setProductsData] = useState<TProductCreate>({
    product_type: "",
    book: "",
    product_name: "",
    calypso_le: "",
    ref_ccy: "",
    gl: "",
    spot: "",
    show_forma: "0",
    show_dorm: "0",
    show_allocation: "0",
  });
  const [proCat, setproCat] = useState([]);
  const {
    mutate: productMutate,
    isLoading: productLoading,
    isSuccess: productIsSuccess,
    isError: productIsError,
    error: productError,
    data: productData,
  } = useEditProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TProductCreate>({
    defaultValues: {
      product_name: productsData.product_name,
      calypso_le: productsData.calypso_le,
      ref_ccy: productsData.ref_ccy,
      gl: productsData.gl,
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
        productId,
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data: any) {
          notify(data?.data?.message, "success");
          setTimeout(() => {
            push("/products");
          }, 1000);
        },
      }
    );
  useEffect(() => {
    if (singleProductIsSuccess) {
      const {
        PRODUCT_NAME,
        PRODUCT_TYPE,
        CALYPSO_LE,
        REF_CCY,
        GL,
        SPOT,
        BOOK,
        SHOW_FORMA,
        SHOW_DORM,
        SHOW_ALLOCATION,
      } = singleProductData.data ?? {};
      setValue("product_name", PRODUCT_NAME);
      setValue("product_type", PRODUCT_TYPE);
      setValue("calypso_le", CALYPSO_LE);
      setValue("ref_ccy", REF_CCY);
      setValue("book", BOOK);
      setValue("gl", GL);
      setValue("show_forma", SHOW_FORMA);
      setValue("show_dorm", SHOW_DORM);
      setValue("show_allocation", SHOW_ALLOCATION);
      setProductType(PRODUCT_TYPE);
      setSpot(SPOT == 1);
      setFormA(SHOW_FORMA == 1);
      setProductsData(singleProductData.data);
    }
  }, [singleProductIsSuccess]);

  useEffect(() => {
    if (productCategoryData) {
      const proCatData = productCategoryData?.data?.rows?.map(
        (item: any, index: number) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-2xl m-auto  mt-5">
      {/*<Button
        href="/products"
        variant="primary"
        className=" text-sm font-normal"
      >
        <i className="bi bi-chevron-left "></i> Done
      </Button>
  */}
      <ProductsCreateHeader productLoading={productLoading} />
      <ProductsCreateProduct
        errors={errors}
        register={register}
        productType={productType}
        setProductType={setProductType}
        proCat={proCat}
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

export default ProductEdit;
