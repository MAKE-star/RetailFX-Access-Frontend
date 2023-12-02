"use client";

import { useQuery } from "react-query";

import { DASHBOARD } from "./constants";
import dashboardService from "./dashboard";

const useRateTableService = () => {
  const useGetRateTables = () =>
    useQuery(DASHBOARD, dashboardService.getDashboards);

  return { useGetRateTables };
};

export default useRateTableService;
