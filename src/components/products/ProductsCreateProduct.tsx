import { product } from "@/lib";
import { FormInput, FormSelect } from "@/ui";
import React from "react";

type Props = {};

const ProductsCreateProduct = ({
  register,
  errors,
  setProductType,
  productType,proCat
}: {
  register?: any;
  errors: any;
  setProductType: any;
  proCat: any;
  productType: string;
}) => {
  return (
    <div className=" grid grid-cols-5  gap-10 border-b-2 border-gray-200 pb-4">
      <div className=" col-span-5 flex gap-8">
        <FormInput
          label="Product Name"
          type="text"
          isInvalid={Boolean(errors?.product_name)}
          {...register("product_name", {
            required: "Product name field is required",
          })}
        />
        <FormSelect
          label={"Product Type"}
          options={proCat}
          value={productType}
          onChange={(event: any) => setProductType(event.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductsCreateProduct;
