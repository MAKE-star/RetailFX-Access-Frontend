import { Button } from "@/ui";
import React from "react";

type Props = {};

const ProductsCreateHeader = ({
  productLoading,
}: {
  productLoading: boolean;
}) => {
  return (
    <div className=" flex justify-between items-center w-full mt-10">
      <div className=" flex justify-between items-center w-full  mb-2">
        <div>
          <Button
            href="/products"
            size= "sm"
            variant="primary"
            className=" text-sm font-normal"
          >
            <i className="bi bi-chevron-left "></i>Back
          </Button>
        </div>

          <Button
            variant="primary"
            className="text-sm font-normal"
            type="submit"
            size= "sm"
            disabled={productLoading}
            loading={productLoading}
          >
            Save 
          </Button>
      </div>
    </div>
  );
};

export default ProductsCreateHeader;
