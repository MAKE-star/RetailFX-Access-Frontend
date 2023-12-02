"use client";
import { Button, FormInput, FormSelect } from "@/ui";
import React, { useEffect, useState } from "react";
import { setSettleOptions } from "@/lib";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TBranchCreate } from "./types";
import { useBranchServices } from "@/services";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { option } from "@/lib";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import Select from "react-select";



const BranchCreateContent = () => {
  const { useCreateBranchSettle } = useBranchServices();
  const { useGetCurrencies } = useRateTableService();
  const { push } = useRouter();
  const [currencyDatas, setCurrencyDatas] = useState<any>([]);
  const [branch_settle_currency, setBranch_settle_currency] = useState("");
  const { data: currenciesData } = useGetCurrencies();
  //const [branch_settle_type, setBranch_settle_type] = useState();

  const [branch_settle_type, setBranch_settle_type] = useState<any>(
    setSettleOptions.find((opt: any) => opt.value === "undefined"),
  );

  



  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  
  const {
    mutate: branchMutate,
    isLoading: branchLoading,
    isSuccess: branchIsSuccess,
    isError: branchIsError,
    error: branchError,
    data: branchData,
  } = useCreateBranchSettle();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TBranchCreate>();
  const onSubmit: SubmitHandler<TBranchCreate> = async (data: any) => {
    branchMutate(
      {
        ...data,
        branch_settle_currency,
        branch_settle_type: branch_settle_type.value,
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          setTimeout(() => {
            push("/branchsettles");
          }, 1000);
        },
      }
    );
  };

  useEffect(() => {
    if (currenciesData) {
      const data = currenciesData?.data?.map((item: any, index: number) => {
        // if (index == 0) setDirection_ccy(item.CURRENCY);
        return {
          label: item.CURRENCY,
          value: item.CURRENCY,
        };
      });
      const allOption = {
        label: "All",
        value: "All",
      };
  
      setCurrencyDatas([allOption, ...data]);

      //setCurrencyDatas(data);
    }
  }, [currenciesData]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
      <div className=" flex justify-between items-center w-full  mb-2">
        <div>
        <Button
          href="/branchsettles"
          size= "sm"
          variant="primary"
          className=" text-sm font-normal"
        >
          <i className="bi bi-chevron-left "></i>Back
        </Button>
      </div>

        <Button
          variant="primary"
          className="text-sm font-normal"
          type="submit"
          size= "sm"
          disabled={branchLoading}
          loading={branchLoading}
        >
          Save
        </Button>
      </div>
      <div className="flex  items-center w-full  mt-5 ">
        <p className=" text-base font-bold">Create Settlement</p>
      </div>
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-5 font-medium	 text-base col-span-1">Book</h4>
        <div className=" col-span-4 flex mt-5 gap-8">
          <FormInput
            label={""}
            isInvalid={Boolean(errors?.branch_settle_book)}
            {...register("branch_settle_book", {
              required: "Branch Book field is required",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start gap-8 pb-4">
        <h4 className="mt-5 font-medium	 text-base col-span-1">Branch Code</h4>
        <div className="col-span-4 flex mt-5 gap-8">
          <FormInput
            label={""}
            isInvalid={Boolean(errors?.branch_settle_code)}
            {...register("branch_settle_code", {
              required: "Branch Code field is required",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-5 font-medium	text-base col-span-1">Branch Name</h4>
        <div className=" col-span-4 mt-5 flex gap-8">
            <FormInput
                label={""}
                isInvalid={Boolean(errors?.branch_settle_name)}
                {...register("branch_settle_name", {
                required: "Branch Name field is required",
                })}
            />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-5 font-medium	text-base col-span-1">Currency</h4>
        <div className=" col-span-1 mt-5 flex gap-8">
            <FormSelect
              value={branch_settle_currency}
              onChange={(e: any) => setBranch_settle_currency(e.target.value)}
              className=" col-span-1"
              label={""}
              options={currencyDatas}
            />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-5 font-medium	text-base col-span-1">Settlement Type</h4>
        <div className=" col-span-1 mt-5">
           <Select
              value={branch_settle_type}
              onChange={(newValue: any) => {
                setBranch_settle_type(newValue);
              }}
              options={setSettleOptions}
              isClearable
              //label = {""}
            />
        </div>
      </div>
      <div className=" grid grid-cols-5  gap-10 border-b-2 border-gray-200 pb-6">
        <p className=" text-base mt-5 col-span-1 font-medium">Settlement Account</p>
        <div className="py-4 mt-5 col-span-4">
            <FormInput
                label={""}
                isInvalid={Boolean(errors?.branch_settle_acct)}
                {...register("branch_settle_acct", {
                required: "Branch Settlement field is required",
                })}
            />
        </div>
      </div>

    <ToastContainer />
    </form>
  );
};

export default BranchCreateContent;
