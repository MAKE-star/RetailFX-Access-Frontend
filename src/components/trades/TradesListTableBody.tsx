"use client";
import { statusOptions, useAuthContext } from "@/lib";
import { Button, FormSelect } from "@/ui";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = {};

const TradesListTableBody = ({
  tradeData,
  selectedItems,
  setSelectedItems,
  updateStatus,
}: {
  tradeData: any;
  selectedItems: any;
  setSelectedItems: any;
  updateStatus: any;
}) => {
  const auth: any = useAuthContext();
  const { user } = auth ?? {};
  const { ROLE_ID } = user ?? {};

  const [tradesData, setTradesData] = useState(tradeData);
  
  const checkData = (event: any, item: any) => {
    const newSelectedItems = selectedItems;
    if (event.target.checked) {
      const newtradesData = tradesData?.map((data: any) => {
        if (data?.ID == item.ID) {
          return {
            ...data,
            checked: true,
          };
        } else return data;
      });
      !!selectedItems?.length
        ? selectedItems?.map((data: any) => {
            if (data != item.ID) {
              newSelectedItems.push(item.ID);
            }
          })
        : newSelectedItems.push(item.ID);
      setSelectedItems(newSelectedItems);
      setTradesData(newtradesData);
    } else {
      const newtradesData = tradesData?.map((data: any) => {
        if (data?.ID == item.ID) {
          return {
            ...data,
            checked: false,
          };
        } else return data;
      });
      const newArray = selectedItems?.filter((data: any) => data != item.ID);
      setSelectedItems(newArray);
      setTradesData(newtradesData);
    }
  };
  useEffect(() => {
    setTradesData(tradeData);
  }, [tradeData]);
  return tradesData?.map((item: any, index: number) => {
    let review =user.ROLE_ID; 
  
    if (review === 1) {
      review = "Edit";
    }else {
      review = "Review";
    }

    /*if(ROLE_ID === 2 && item?.STATUS == "0") {
      return tradesData.STATUS;
    }*/

    /*const filteredTrades = tradesData?.map((data: any) => {
      if(ROLE_ID === 1 && item?.STATUS == "0") {
        return null
      }
    });*/

    return (
      <>
        <tr key={item?.ID} className="border-b-[1.5px] border-gray-200 ">
          <td
            scope="col"
            className="text-sm font-normal text-gray-600 p-1 text-left"
          >
            {item?.CUSTOMER_REF}
          </td>

          <td
            scope="col"
            className="text-sm font-normal text-gray-600 p-1 text-left"
          >
            <p className=" text-gray-600">{item?.ACC_NO}</p>
            <p className=" text-black-600">{item?.ACC_NAME}</p>
          </td>

          <td
            scope="col"
            className="text-sm font-normal text-gray-600 p-1 text-left"
          >
            {item?.PRODUCT_NAME}
          </td>
          <td
            scope="col"
            className="text-sm font-normal text-gray-600 p-1 text-left"
          >
            <p className=" text-gray-600 text-left">
              {Number(item?.WE_SELL).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className=" text-gray-400 text-xs">{item?.WE_SELL_CCY}</p>
          </td>
          <td className="text-sm font-normal text-gray-600 p-1 text-left">
            <p className=" text-gray-600 text-left">
              {Number(item?.DEBIT_AMOUNT).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className=" text-gray-400 text-xs">{item?.ACC_CURRENCY}</p>
          </td>
          <td className="text-sm font-normal text-gray-600 p-1 text-left">
            <p className=" text-gray-600 text-left">
              {Number(item?.REF_AMOUNT).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className=" text-gray-400 text-xs">{item?.REF_CCY}</p>
          </td>
          <td
            scope="col"
            className="text-sm font-normal text-gray-600 p-1 text-left"
          >
            {dayjs(item?.TRADE_DATE).format("DD/MM/YYYY")}
          </td>
          <td
            className={` ${
              item?.STATUS == "1"
                ? "text-green-600"
                : item?.STATUS == "2"
                ? " text-red-600"
                : "text-blue-600"
            } text-sm font-normal  p-1 text-left capitalize`}
          >
            {ROLE_ID == 0 ? (
              item?.STATUS != "2" ? (
                item?.STATUS
              ) : (
                <FormSelect
                  className={` bg-white focus:border-b-none focus:border-white  ${
                    item?.STATUS == "1"
                      ? "text-green-500"
                      : item?.STATUS == "2"
                      ? " text-red-500"
                      : "text-blue-900"
                  }`}
                  label={""}
                  value={item?.STATUS}
                  options={statusOptions}
                  onChange={(e: any) =>
                    updateStatus({
                      status: e.target.value,
                      tradesId: item?.ID,
                      product: item?.PRODUCT,
                    })
                  }
                />
              )
            ) : item?.STATUS == "1" ? (
              "Approved"
            ) : item?.STATUS == "2" ? (
              "Rejected"
            ) : (
              "Pending"
            )}
          </td>
          <td>
            <Button
              variant="infoLink"
              href={`/trades/edit/${item?.ID}`}
              className="flex gap-3 text-sm text-black-600 font-normal text-center"
            >
              {review}
            </Button>
          </td>
        </tr>
      </>
    );
  });
};

export default TradesListTableBody;
