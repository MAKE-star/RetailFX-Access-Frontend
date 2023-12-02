"use client";

import { useQuery, useMutation } from "react-query";

import {
  CREATE_RATES,
  DELETE_RATE,
  EDIT_RATE,
  GET_RATETABLES,GET_CURRENCIES
} from "./constants";
import rateTableService from "./rateTable";
import { TUseMutationOption } from "../types";

const useRateTableService = () => {
  const useGetRateTables = () =>
    useQuery(GET_RATETABLES, rateTableService.getRateTables);
  const useGetCurrencies = () =>
    useQuery(GET_CURRENCIES, rateTableService.getCurrencies);
  const useCreateRates = (options?: TUseMutationOption) =>
    useMutation(CREATE_RATES, rateTableService.createRates, options);
  const useDeleteRate = (options?: TUseMutationOption) =>
    useMutation(DELETE_RATE, rateTableService.deleteRate);
  const useEditRate = (options?: TUseMutationOption) =>
    useMutation([EDIT_RATE], rateTableService.editRates, options);

  return { useGetRateTables, useCreateRates, useDeleteRate, useEditRate,useGetCurrencies };
};

export default useRateTableService;
