"use client";
import React, { useEffect, useState } from "react";
import { TTradesCreate, TTradesList } from "./types";
import {
  TradesListHeader,
  TradesListTableBody,
  TradesListTableHeader,
} from "@/components";
import useTradeService from "@/services/trade/useTradeServices";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
import { SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
import { GET_TRADES, GET_TRADES_BY_STATUS } from "@/services/trade/constants";
import { TradeFilterQuery } from "@/services/trade/trade";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { useDebounce } from "@uidotdev/usehooks";

//const TradesList = ({}: TTradesList) => {
const TradesList = () => {
  const queryClient = useQueryClient();
  const { useDeleteTrade, useTradesFilter, useEditTrade } = useTradeService();
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState<TradeFilterQuery>({});
  const debouncedFilters = useDebounce(filters, 300);

  const { data: tradeStatusData } = useTradesFilter(debouncedFilters, page);

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };

  // const { mutate: tradeDeleteMutate, isLoading: tradeDeleteLoading } =
  //   useDeleteTrade();
  // const onSubmit = async () => {
  //   selectedItems?.map((item) => {
  //     tradeDeleteMutate(item, {
  //       onError(error: any) {
  //         notify(error?.response?.data?.message, "err");
  //       },
  //       onSuccess(data) {
  //         tradeRefetch();
  //       },
  //     });
  //   });
  // };
  const { mutate: tradeUpdateStatusMutate } = useEditTrade();
  const updateStatus: SubmitHandler<TTradesCreate> = async (data: any) => {
    tradeUpdateStatusMutate(data, {
      onError(error: any) {
        notify(error?.response?.data?.message, "err");
      },
      onSuccess(data) {
        notify(data?.data?.message, "success");
        queryClient.invalidateQueries(GET_TRADES_BY_STATUS);
      },
    });
  };
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TRADES, GET_TRADES_BY_STATUS],
      });
    };
  }, [queryClient]);

  useEffect(() => {
    if (tradeStatusData) {
      const totalCount = tradeStatusData.data.count;
      setCount(totalCount);
    }
  }, [tradeStatusData]);
  return (
    <div>
      <div className=" px-6 py-3">
        <TradesListHeader
          selectedItems={selectedItems}
          count={tradeStatusData?.data?.count || 0}
          setFilters={setFilters}
          filters={filters}
          setPage={setPage}
          page={page}
        />
        {tradeStatusData?.data?.rows.length > 0 ? (
          <table className="overflow-y overflow-auto mt-4 w-full ">
            <thead className="min-w-full border-b-[1.5px] border-t-[1.5px] border-gray-200 ">
              <TradesListTableHeader />
            </thead>
            <tbody>
              <TradesListTableBody
                tradeData={tradeStatusData?.data?.rows}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                updateStatus={updateStatus}
              />
            </tbody>
          </table>
        ) : (
          <div className="w-full flex items-center justify-center pt-10 font-md text-lg">
            No Trades found
          </div>
        )}

        <ToastContainer />
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%"}}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem" }}>Total Trades:  {count}</span>
        </div>
      </div>
    </div>
  );
};

export default TradesList;
