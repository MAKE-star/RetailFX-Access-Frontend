"use client";
import React, { useEffect, useState } from "react";
import { TBranchList } from "../branchsettles/types"; 
import { useRouter } from "next/navigation";
import CheckBox from "@/ui/CheckBox";
import { Button } from "@/ui";
import { cn } from "@/lib";
import dayjs from "dayjs";
import Link from "next/link";

const BranchTable = ({ selectedItems, branchSettle, setSelectedItems }: TBranchList) => {
    const { push } = useRouter();
    const [branchData, setBranchData] = useState(branchSettle);
    
    const checkData = (BR_SETTLE_ID: any) => {
      if (selectedItems.includes(BR_SETTLE_ID)) {
        setSelectedItems(selectedItems.filter((id: any) => id !== BR_SETTLE_ID));
      } else {
        setSelectedItems([...selectedItems, BR_SETTLE_ID]);
      }
    };
    useEffect(() => {
      setBranchData(branchSettle);
    }, [branchSettle]);
  
    const style = "text-gray-800 p-1 text-sm text-start";
    const headStyle = "text-black-400 text-xs font-bold p-1 text-start";
    return (
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className={headStyle}>BOOK</th>
            <th className={headStyle}>BRANCH CODE</th>
            <th className={headStyle}>BRANCH NAME</th>
            <th className={headStyle}>SETTLEMENT TYPE</th>
            <th className={headStyle}>SETTLEMENT ACCOUNT</th>
            <th className={headStyle}>SETTLEMENT CURRENCY</th>
            <th className={headStyle}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {branchData?.map((branch: any, index: any) => {
            return (
              <tr
                key={branch.ID}
                className={cn(
                  index % 2 == 0 ? "bg-white cursor-pointer" : "bg-gray-50"
                )}
              >
                <td
                  scope="col"
                  className="text-sm font-normal text-gray-600 p-1 text-left"
                >
                  <div className=" flex items-center gap-5">
                  <CheckBox
                    checked={selectedItems.includes(branch.BR_SETTLE_ID)}
                    onChange={() => checkData(branch.BR_SETTLE_ID)}
                  />
                    {branch?.BR_SETTLE_BOOK}
                  </div>
                </td>
                <td
                  scope="col"
                  className="text-sm font-normal text-gray-600 p-1 text-left"
                >
                  <div className=" flex items-center gap-5">
                    {branch?.BR_SETTLE_CODE}
                  </div>
                </td>
                <td
                  className={style}
                >{`${branch.BR_SETTLE_NAME}`}</td>
                <td
                  className={style}
                > {branch.BR_SETTLE_TYPE === 2 ? 'Cash' : branch.BR_SETTLE_TYPE === 1 ? 'Nostro' : ''}</td>
                <td className={style}>
                  {`${branch.BR_SETTLE_ACCT}`}
                </td>
                <td className={style}>
                  {`${branch.BR_SETTLE_CURRENCY}`}
                </td>
                <td>
                  <Button
                    variant="infoLink"
                    href={`/branchsettles/edit/${branch?.BR_SETTLE_ID}`}
                    className="flex gap-3 text-sm text-black font-normal text-center"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
  export default BranchTable;
  