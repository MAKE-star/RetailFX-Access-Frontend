"use client";

import { useQuery, useMutation } from "react-query";
import tradeService, { TradeFilterQuery } from "./trade";
import {
  GET_TRADES,
  GET_SINGLE_TRADE,
  EDIT_TRADE,
  CREATE_TRADE,
  DELETE_TRADE,
  ACCOUNT_DETAILS,
  GET_TRADES_BY_STATUS,
} from "./constants";
import { TUseMutationOption } from "../types";

const useTradeService = () => {
  const useGetTrades = (page: number) =>
    useQuery([GET_TRADES, page], () => tradeService.getTrades(page));
  const useTradesFilter = (filters: TradeFilterQuery, page: number = 1) =>
    useQuery([GET_TRADES_BY_STATUS, filters, page], () =>
      tradeService.filterTrades(filters, page)
    );
  const useAccountDetails = (accountNumber: string) =>
    useQuery(
      [ACCOUNT_DETAILS, accountNumber],
      () => {
        return tradeService.getAccountDetails(accountNumber);
      },
      {
        enabled: !!accountNumber,
      }
    );

  const useGetSingleTrade = (tradesId: any) =>
    useQuery([GET_SINGLE_TRADE, tradesId], () =>
      tradeService.getSingleTrade(tradesId)
    );
  const useCreateTrade = (options?: TUseMutationOption) =>
    useMutation(CREATE_TRADE, tradeService.createTrade, options);
  const useEditTrade = (options?: TUseMutationOption) =>
    useMutation(EDIT_TRADE, tradeService.editTrade, options);
  const useDeleteTrade = (options?: TUseMutationOption) =>
    useMutation(DELETE_TRADE, tradeService.deleteTrade, options);
  return {
    useGetTrades,
    useGetSingleTrade,
    useCreateTrade,
    useEditTrade,
    useDeleteTrade,
    useAccountDetails,
    useTradesFilter,
  };
};

export default useTradeService;
