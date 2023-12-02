"use client";
import { AxiosResponse } from "axios";
import { UseMutationOptions, UseQueryOptions } from "react-query";

export type TUseMutationOption = Omit<
  UseMutationOptions<AxiosResponse<any, any>, unknown, any, unknown>,
  "mutationFn"
>;

// Define a type for your specific query key
type MyQueryKey = [string, number];

// Define a new type TUseQueryOption
export type TUseQueryOption = Omit<
  // Exclude the property queryFn from UseQueryOptions
  UseQueryOptions<AxiosResponse<any, any>, MyQueryKey, any, any>,
  "queryFn"
>;
