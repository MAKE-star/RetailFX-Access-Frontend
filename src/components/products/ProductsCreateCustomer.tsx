import { FormInput } from "@/ui";
import React from "react";

type Props = {};

const ProductsCreateCustomer = ({
  register,
  errors,
}: {
  register?: any;
  errors: any;
}) => {
  return (
 <>
    <div className=" grid grid-cols-5 gap-10 border-b-2 border-gray-200 pb-4">
      <div className=" col-span-5 flex gap-8">
        <FormInput
          label="Calypso LE"
          type="text"
          isInvalid={Boolean(errors?.calypso_le)}
          {...register("calypso_le", {
            required: "Calypso SE field is required",
          })}
        />
        <FormInput
          label="Customer Suspense GL Acct"
          type="text"
          isInvalid={Boolean(errors?.gl)}
          {...register("gl", {
            required: "Customer Suspense Cr GL Acct field is required",
          })}
        />
      </div>
    </div>
 </>
  );
};

export default ProductsCreateCustomer;
