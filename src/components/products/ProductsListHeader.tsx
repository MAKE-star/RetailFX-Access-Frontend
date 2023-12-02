"use client";
import { Button } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import Pagination from "@/ui/Pagination";
import React, { useState } from "react";

const ProductsListHeader = ({
  onSubmit,
  productsData,
  selectedItems,
  count,
  setPage,
  page,
}: {
  onSubmit: any;
  selectedItems: any;
  productsData: any;
  count: number;
  setPage: any;
  page: any;
}) => {
  const [open, setOpen] = useState(false);
  const deleteProduct = () => {
    setOpen(true);
  };

//const isAnyProductSelected = selectedItems. length > 0;
  return (
    <div className=" flex justify-between items-center w-full">
      <div className=" flex items-center gap-5">
        <p className=" text-base font-semibold">
          Products{" "}
          <span className=" font-normal">({productsData?.length})</span>
        </p>
        <Button variant="primary" size="sm" href="/products/create">
          <div className=" flex justify-center items-center w-full">
            <i className="bi bi-plus"></i>
            <p className=" font-normal">Add Products</p>
          </div>
        </Button>
  
        <Button
          size={"sm"}
          className="border border-red-500 border-solid bg-gray-50 p-1.5"
          onClick={deleteProduct}
        >
          <div className="flex justify-center items-center w-full gap-3">
            <i className="bi bi-trash-fill text-red-500"></i>
            <p className=" font-normal text-red-500">Delete Selected</p>
          </div>     
        </Button>
      </div>
      <div className=" flex gap-5 items-center">
        <Pagination setPage={setPage} currentPage={page} count={count} />
      </div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        onDelete={onSubmit}
        header={"Delete Product"}
        label={"Are you sure want to delete this product?"}
        btnText={"Delete"}
      />
    </div>
  );
};

export default ProductsListHeader;
