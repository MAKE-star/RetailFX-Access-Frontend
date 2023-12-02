"use client";
import { Button, FormInput, FormSelect } from "@/ui";
import React, { useEffect, useState } from "react";
import { useBranchServices } from "@/services";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TBranchEdit } from "./types";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { option , setSettleOptions} from "@/lib";
import Select from "react-select";
import useRateTableService from "@/services/rate-table/useRateTableServices";

const BranchEditContent = ({}) => {
  const params = useParams();
  const { push } = useRouter();
  
  const { branchId } = params;
  
  const [branchSettle, setBranchSettle] = useState<TBranchEdit>({
    branch_settle_book: "",
    branch_settle_code: "",
    branch_settle_name: "",
    branch_settle_acct: "",
    branch_settle_type: 0,
    branch_settle_currency: "",
  });

  const [branch_settle_currency, setBranch_settle_currency] = useState(branchSettle.branch_settle_currency);
  const [branch_settle_type, setBranch_settle_type] = useState<any>(
    setSettleOptions.find((opt: any) => opt.value === branchSettle.branch_settle_type),
  );

  //const [status, setStatus] = useState("0");
  const { useEditBranchSettle, useGetBranchSettle, useDeleteBranchSettle } =
    useBranchServices();
  const { useGetCurrencies } = useRateTableService();
  const [currencyDatas, setCurrencyDatas] = useState<any>([]);
  const { data: currenciesData } = useGetCurrencies();
  const {
    data: singleBranchData,
    isLoading: singleBranchIsLoading,
    error: singleBranchError,
    isSuccess: singleBranchIsSuccess,
    refetch: singleBranchRefetch,
  } = useGetBranchSettle(branchId);
  const { mutate: branchMutate, isLoading: branchLoading } = useEditBranchSettle();
  const { mutate: branchDeleteMutate, isLoading: branchDeleteLoading } =
    useDeleteBranchSettle();
  const onDelete = () => {
    branchDeleteMutate(branchId, {
      onError(error: any) {
        notify(error?.response?.data?.message, "err");
      },
      onSuccess(data) {
        notify(data?.data?.message, "success");
        setTimeout(() => {
          push("/branchsettles");
        }, 1000);
      },
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    control,
  } = useForm<TBranchEdit>({
    defaultValues: {
      branch_settle_book: branchSettle.branch_settle_book,
      branch_settle_code: branchSettle.branch_settle_code,
      branch_settle_name: branchSettle.branch_settle_name,
      branch_settle_currency: branchSettle.branch_settle_currency,
      branch_settle_type: branchSettle.branch_settle_type,
      branch_settle_acct: branchSettle.branch_settle_acct,
    },
  });

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const onSubmit: SubmitHandler<TBranchEdit> = async (data) =>
    branchMutate(
      {
        ...data,
        branchId,
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
  

  useEffect(() => {
    if (singleBranchIsSuccess ) {
      setBranchSettle(singleBranchData.data);
      const {
        BR_SETTLE_BOOK,
        BR_SETTLE_CODE,
        BR_SETTLE_NAME,
        BR_SETTLE_CURRENCY,
        BR_SETTLE_TYPE,
        BR_SETTLE_ACCT,
      } = singleBranchData.data ?? {};
      setValue("branch_settle_book", BR_SETTLE_BOOK);
      setValue("branch_settle_code", BR_SETTLE_CODE);
      setValue("branch_settle_name", BR_SETTLE_NAME);
      setValue("branch_settle_currency", BR_SETTLE_CURRENCY);
      setValue("branch_settle_type",setSettleOptions.find((opt: any) => opt.value === BR_SETTLE_TYPE));
      setValue("branch_settle_acct", BR_SETTLE_ACCT);
      setBranch_settle_currency(BR_SETTLE_CURRENCY);
      setBranch_settle_type(setSettleOptions.find((opt: any) => opt.value === BR_SETTLE_TYPE));
    }
  }, [setValue, singleBranchData, singleBranchIsSuccess]);

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
          className=" text-sm font-normal"
          type="submit"
          size= "sm"
          disabled={branchLoading}
          loading={branchLoading}
        >
          Save
        </Button>
      </div>
      <div className="flex items-center gap-3 pb-4">
        <h4 className="text-xl font-semibold">{`${singleBranchData?.data?.BR_SETTLE_NAME}`}</h4>
        <p>Settlement</p>
      </div>
      <div className="grid grid-cols-5 items-start pb-8">
        <h4 className="mt-5 font-medium	 text-base col-span-1">Book</h4>
        <div className="mt-5 col-span-4 flex gap-8">
          <FormInput
            label={""}
            isInvalid={Boolean(errors?.branch_settle_book)}
            {...register("branch_settle_book", {
              required: "Branch Book field is required",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start gap-8 pb-8">
        <h4 className="mt-5 font-medium	 text-base col-span-1">Branch Code</h4>
        <div className="mt-5 col-span-4 flex gap-8">
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
        <h4 className="mt-5 font-medium	 text-base col-span-1">Branch Name</h4>
        <div className="mt-5 col-span-4 flex gap-8">
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
        <div className="mt-5 py-4 col-span-4">
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

export default BranchEditContent;
