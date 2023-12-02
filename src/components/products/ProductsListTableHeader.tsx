import { ProductsTableHeader } from "@/lib";
import CheckBox from "@/ui/CheckBox";
import React from "react";

type Props = {};

const ProductsListTableHeader = (props: Props) => {
  return (
    <tr>
      <th
        scope="col"
        className="text-black-400 text-sm p-1 font-bold text-start"
      >
        <div className="flex  gap-3">
          {/* <CheckBox checked={false} /> */}
          S.No
        </div>
      </th>
      {ProductsTableHeader?.map((item: any, index: number) => {
        return (
          <th
            key={index}
            scope="col"
            className="text-black-400 text-sm p-1 font-bold text-start"
          >
            {item?.title}
          </th>
        );
      })}
    </tr>
  );
};

export default ProductsListTableHeader;
