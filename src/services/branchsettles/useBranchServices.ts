"use client";

import { useQuery, useMutation, UseQueryOptions } from "react-query";
import branchSettleService from "./branchsettles";
import {
  GET_BRANCHSETTLES,
  GET_BRANCHSETTLE,
  GET_NOSTROACCOUNTS,
  EDIT_BRANCHSETTLE,
  CREATE_BRANCHSETTLE,
  DELETE_BRANCHSETTLE,
} from "./constants";
import { TUseMutationOption } from "../types";


function useBranchServices() {
  const useGetBranchSettles = (page: number, options?: UseQueryOptions) =>
    useQuery([GET_BRANCHSETTLES, page], () => branchSettleService.getBranchSettles(page));
  const useGetBranchSettle = (branchId: any) =>
    useQuery([GET_BRANCHSETTLE, branchId], () =>
      branchSettleService.getBranchSettle(branchId)
    );
  const useCreateBranchSettle = (options?: TUseMutationOption) =>
    useMutation(CREATE_BRANCHSETTLE, branchSettleService.createBranchSettle, options);
  const useEditBranchSettle = (options?: TUseMutationOption) =>
    useMutation([EDIT_BRANCHSETTLE], branchSettleService.editBranchSettle, options);
  const useDeleteBranchSettle = (options?: TUseMutationOption) =>
    useMutation(DELETE_BRANCHSETTLE, branchSettleService.deleteBranchSettle, options);
    const useGetNostroAccounts = (search: any) =>
    useQuery(
      GET_NOSTROACCOUNTS,
      () => branchSettleService.getNostroAccounts(search),
      search
    );
  return {
    useGetBranchSettles,
    useGetBranchSettle,
    useCreateBranchSettle,
    useEditBranchSettle,
    useDeleteBranchSettle
  };
}

export default useBranchServices;
