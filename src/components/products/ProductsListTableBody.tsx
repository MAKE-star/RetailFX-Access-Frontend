"use client";
import { Button } from "@/ui";
import CheckBox from "@/ui/CheckBox";
import Link from "next/link";
import { it } from "node:test";
import React, { useEffect, useState } from "react";

type Props = {};

const ProductsListTableBody = ({
  productsList,
  selectedItems,
  setSelectedItems,
}: {
  productsList: any;
  selectedItems: any;
  setSelectedItems: any;
}) => {
  const [productData, setProductData] = useState(productsList);
  const checkData = (event: any, item: any) => {
    const newSelectedItems = selectedItems;
    if (event.target.checked) {
      const newproductData = productData?.map((data: any) => {
        if (data?.PRODUCT_ID == item.PRODUCT_ID) {
          return {
            ...data,
            checked: true,
          };
        } else return data;
      });
      !!selectedItems?.length
        ? selectedItems?.map((data: any) => {
            if (data != item.PRODUCT_ID) {
              newSelectedItems.push(item.PRODUCT_ID);
            }
          })
        : newSelectedItems.push(item.PRODUCT_ID);
      setSelectedItems(newSelectedItems);
      setProductData(newproductData);
    } else {
      const newproductData = productData?.map((data: any) => {
        if (data?.PRODUCT_ID == item.PRODUCT_ID) {
          return {
            ...data,
            checked: false,
          };
        } else return data;
      });
      const newArray = selectedItems?.filter(
        (data: any) => data != item.PRODUCT_ID
      );
      setSelectedItems(newArray);
      setProductData(newproductData);
    }
  };
  useEffect(() => {
    setProductData(productsList);
  }, [productsList]);

  return productData?.map((item: any, index: any) => {
    return (
      <>
        <tr
          key={item?.PRODUCT_ID}
          className="border-b-[1.5px] border-gray-200 "
        >
          <td
            scope="col"
            className="text-sm font-normal text-gray-700 p-1 text-left"
          >
            <div className=" flex items-center gap-5">
              <CheckBox
                onChange={(e: any) => checkData(e, item)}
                checked={item?.checked}
              />
              {index + 1}
            </div>
          </td>
          <td
            scope="col"
            className="text-sm font-normal text-gray-700 p-1 text-left"
          >
            {item?.PRODUCT_NAME}
          </td>
          <td
            scope="col"
            className="text-sm font-normal text-gray-700 p-1 text-left"
          >
            {item?.REF_CCY}
          </td>
          <td
            scope="col"
            className="text-sm font-normal text-gray-700 p-1 text-left"
          >
            {item?.CATEGORY}
          </td> 
          <td
            scope="col"
            className="text-sm font-normal text-gray-700 p-1 text-left"
          >
            {item?.BOOK}
          </td>
          <td>
            <Button
              variant="infoLink"
              href={`/products/edit/${item?.PRODUCT_ID}`}
              className="flex gap-3 text-sm text-black font-normal text-center"
            >
              Edit
            </Button>
          </td>
        </tr>
      </>
    );
  });
};

export default ProductsListTableBody;
