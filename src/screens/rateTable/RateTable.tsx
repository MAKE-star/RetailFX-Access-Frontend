import React from "react";
import { TRateTable } from "./types";
import { RateTableHeader, RateTableCard } from "@/components";

const RateTable = ({}: TRateTable) => {
  return (
    <div className="  py-3">
      <RateTableHeader />
      <RateTableCard />
    </div>
  );
};

export default RateTable;
