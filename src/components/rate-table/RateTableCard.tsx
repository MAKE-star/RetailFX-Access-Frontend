"use client";
import { rateCardList } from "@/lib";
import React, { useEffect ,useState } from "react";
import RateTableCardRow from "./RateTableCardRow";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const RateTableCard = ({}) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const { useGetRateTables } = useRateTableService();
  const {
    data: rateData,
    isLoading: rateIsLoading,
    error: rateError,
    refetch: rateRefetch,
  } = useGetRateTables();

  useEffect(() => {
    if (rateData) {
      const totalCount = rateData.data.length;
      setCount(totalCount);
    }
  }, [rateData]);
  return (
    <div>
      <div className=" max-w-screen-sm mx-auto scroll-blue mt-4 overflow- overflow-auto">
        {rateData?.data?.map((item: any, index: any) => {
          return (
            <div key={item?.ID} className="w-full mt-3 ">
              <RateTableCardRow
                key={item?.ID}
                currency={item?.PRIMARY_CCY}
                currencyList={item}
                refetch={rateRefetch}
                icon={<i className="bi bi-trash-fill text-red-300"></i>}
              />
            </div>
          );
        })}
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%"}}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem" }}>Total Rates Added:  {count}</span>
        </div>
      </div>
    </div>
  );
};

export default RateTableCard;
