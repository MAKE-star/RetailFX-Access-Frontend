"use client";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import { Button } from "@/ui";
import CurrencyModal from "@/ui/CurrencyModal";
import dayjs from "dayjs";
import React, { useState } from "react";

const RateTableHeader = ({}) => {
  const [open, setOpen] = useState(false);
  const addCurrency = () => {
    setOpen(true);
  };

  return (
    <div className=" mt-4 flex justify-between items-center w-full">
      <div className="ml-10 ">
        <Button size="sm" variant="primary" onClick={addCurrency}>
          <div className=" flex justify-center items-center w-full">
            <i className="bi bi-plus "></i>
            <p className=" font-normal">Add Rate</p>
          </div>
        </Button>
        <CurrencyModal
          open={open}
          setOpen={setOpen}
          header={"New Currency"}
          label={
            "Adding a new currency will create a matrix with all other currency for rate table"
          }
          btnText={"Add Currency"}
        />
      </div>
      <div className="mr-10">
        <Button
          href="/dashboard"
          variant="primary"
          size="sm"
          className=" text-sm font-normal"
        >
          <i className="bi bi-chevron-left "></i>Back
        </Button>
      </div>
    </div>
  );
};

export default RateTableHeader;
