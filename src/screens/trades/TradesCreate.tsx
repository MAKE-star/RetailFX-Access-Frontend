"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TTradesCreate } from "./types";
import {
  TradesCreateHeader,
  TradesCreateLeftSection,
  TradesCreateRightSection,
} from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import useTradeService from "@/services/trade/useTradeServices";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
import { useRouter } from "next/navigation";
import { useProductService } from "@/services/products";
import dayjs from "dayjs";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import useBranchServices from "@/services/branchsettles/useBranchServices";
import { useDebounce } from "@uidotdev/usehooks";

const TradesCreate = ({}) => {
  const { useCreateTrade, useAccountDetails } = useTradeService();
  const { useGetProducts, useDeleteProduct } = useProductService();
  const { useGetCurrencies, useGetRateTables } = useRateTableService();
  const { useGetBranchSettles, useGetBranchSettle } = useBranchServices();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const [productname, setProductname] = useState<any>({});
  const [productDatas, setProductDatas] = useState([]);
  const [currencyDatas, setCurrencyDatas] = useState([]);
  const [branchsDatas, setBranchsDatas] = useState([]);
  const [rateDatas, setRateDatas] = useState([]);
  const [direction_ccy, setDirection_ccy] = useState("");
  const [dorm_accno, setNostro_acct] = useState("");
  const [acc_ccy, setAcc_ccy] = useState("");
  const [showFormA, setShowFormA] = useState(false);

  const [showDorm, setShowDorm] = useState(false);
  const [showAllocation, setShowAllocation] = useState(false);
  const [currencySwitch1, setCurrencySwitch1] = useState(false);
  const [currencySwitch2, setCurrencySwitch2] = useState(false);

  const {
    data: productData,
    isLoading: productIsLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProducts(page);
  const {
    data: rateData,
    isLoading: rateIsLoading,
    error: rateError,
    refetch: rateRefetch,
  } = useGetRateTables();
  const {
    data: branchData,
    isLoading: branchIsLoading,
    error: branchError,
    refetch: branchRefetch,
  } = useGetBranchSettles(page);
  const { data: currenciesData } = useGetCurrencies();
  const {
    mutate: tradeMutate,
    isLoading: tradeLoading,
    isSuccess: tradeIsSuccess,
    isError: tradeIsError,
    error: tradeError,
    data: tradeData,
  } = useCreateTrade();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
  } = useForm<TTradesCreate>({
    defaultValues: {
      direction: "SELL",
      trade_date: new Date(),
      sell_settle_date: new Date(),
      customer_debit_settle_date: new Date(),
      reference_ccy_settle_date: new Date(),
      allocation_date: new Date(),
      travel_date: null,
      // acc_currency: "USD",
      we_sell_ccy: "USD",
      debit_ccy: "USD",
      ref_ccy: "USD",
    },
  });
  const we_sell = watch("we_sell");
  //const ref_amount = watch("ref_amount");
  const acc_no = watch("acc_no");
  const accNoDebounced = useDebounce(acc_no, 300);
  const {
    data: accountDetailsData,
    isLoading: accountDetailsIsLoading,
    error: accountDetailsError,
    refetch: accountDetailsRefetch,
  } = useAccountDetails(accNoDebounced);
  const dormAccNo = watch("dorm_accno");
  const dormAccNoDebounced = useDebounce(dormAccNo, 300);
  const { data: dormAccountDetailsData } =
    useAccountDetails(dormAccNoDebounced);

  const exchange_rate1 = watch("exchange_rate1");
  const exchange_rate2 = watch("exchange_rate2");
  const custDebitAmount = watch("debit_amount");
  const accBalance = watch("acc_balance");
  const ref_ccy = watch("ref_ccy");
  const ref_amount = watch("ref_amount");

  const notify = (message: any, tag: any) => {
    tag == "err" ? toast.error(message) : toast.success(message, option);
  };
  const onSubmit: SubmitHandler<TTradesCreate> = async (data: any) => {
    if (custDebitAmount > accBalance) {
      notify("Debit amount is greater than balance", "err");
      return;
    }
    const CustomerCode =
      accountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0]
        ?.customer_no;


    const dormCustomerCode =
      dormAccountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0]
        ?.customer_no;

    const dormCurrency =
      dormAccountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0]
        ?.currency_code;

    if (showDorm && direction_ccy !== dormCurrency) {
      notify("Direction currency must match dorm account currency", "err");
      return;
    }
    if (showDorm && dormCustomerCode !== CustomerCode) {
      notify("Account belongs to a different customer", "err");
      return;
    }

    tradeMutate(
      {
        ...data,
        we_sell_ccy: direction_ccy,
        direction_ccy,
        product_id: productname.PRODUCT_ID,
        dorm_accno,
        status: 0,
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          setTimeout(() => {
            push("/trades");
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
      setCurrencyDatas(data);
    }
  }, [currenciesData]);
  useEffect(() => {
    if (productData) {
      const data = productData?.data?.rows?.map((item: any, index: number) => {
        if (index == 0) {
          /* setProductname({
          label: item?.PRODUCT_NAME,
          value: item?.PRODUCT_ID,
        }) */
        }
        return {
          label: item?.PRODUCT_NAME,
          value: item?.PRODUCT_ID,
        };
      });
      setProductDatas(data);
    }
  }, [productData]);

  useEffect(() => {
    if (branchData) {
      const filteredAccounts = branchData?.data?.rows?.filter(
        (item: any) => item?.BR_SETTLE_TYPE === 1
      );
      console.log("Filter1000001", branchData?.data?.rows);
      console.log("Filtered",filteredAccounts);
  
      const Accounts = filteredAccounts?.filter(
        (item: any) => item?.BR_SETTLE_CURRENCY === direction_ccy
      );
      console.log("Currency related",Accounts);
  
      const data = Accounts?.map((item: any, index: number) => {
        return {
          label: item?.BR_SETTLE_ACCT,
          value: item?.BR_SETTLE_ACCT,
        };
      });
  
      setBranchsDatas(data || []);
    }
  }, [branchData, direction_ccy]);
  
  const setProductValue = (item: any) => {
    setProductname(item);
    if (productData) {
      setValue("acc_name", "");
      setValue("acc_no", "");
      setValue("dorm_accname", "");
      setValue("dorm_accno", "");
      setValue("customer_ref", "");
      setValue("branch", "");
      setValue("acc_currency", "");
      setValue("dormacc_currency", "");
      setValue("acc_balance", 0);
      setAcc_ccy("");
    }
  };

  useEffect(() => {
    const product = productData?.data?.rows?.find(
      (data: any, index: number) => data.PRODUCT_ID == productname?.PRODUCT_ID
    );
    if (direction_ccy !== acc_ccy) {
      setValue("ref_ccy", product?.REF_CCY);
    }
    setShowFormA(product?.SHOW_FORMA == "1");
    setShowDorm(product?.SHOW_DORM == "1");
    setShowAllocation(product?.SHOW_ALLOCATION == "1");
  }, [acc_ccy, direction_ccy, productData, productname, setValue]);

  useEffect(() => {
    if (productData) {
      const data = productData?.data?.rows?.find(
        (item: any, index: number) => item.PRODUCT_ID == productname?.PRODUCT_ID
      );
      setShowFormA(data?.SHOW_FORMA == "1");
      setShowDorm(data?.SHOW_DORM == "1");
      setShowAllocation(data?.SHOW_ALLOCATION == "1");
    }
  }, [acc_ccy, direction_ccy, productData, productname, setValue]);

  useEffect(() => {
    if (accountDetailsData && acc_no?.length == 10) {
      const {
        account_no,
        account_name,
        branch_code,
        currency_code,
        net_balance,
      } =
        accountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0] ?? {};
      setValue("acc_name", account_name);
      setValue("branch", branch_code);
      setValue("acc_currency", currency_code);
      setValue("acc_balance", net_balance);
      setAcc_ccy(currency_code);
    } else {
      setValue("acc_name", "");
      setValue("branch", "");
      setValue("acc_currency", "");
      setValue("acc_balance", 0.0);
      setAcc_ccy("");
    }
  }, [accountDetailsData, acc_no, setValue]);

  useEffect(() => {
    if (dormAccountDetailsData && dormAccNo?.length == 10) {
      const { 
        account_name, 
        currency_code
      } =
        dormAccountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0] ??
        {};
      setValue("dorm_accname", account_name);
      setValue("dormacc_currency", currency_code);
    } else {
      setValue("dorm_accname", "");
      setValue("dormacc_currency","");
    }
  }, [dormAccountDetailsData, setValue]);//@mayopo

  useEffect(() => {
    if (acc_no === dormAccNo) {
      setError("dorm_accno", {
        message: "Dorm Account cannot be the same as primary account",
      });
    } else {
      clearErrors("dorm_accno");
    }
  }, [acc_no, clearErrors, dormAccNo, setError]);


  const getRate = useCallback(
    (primary: any, secondery: any) => {
      const rate: any = rateDatas?.find(
        (item: any) =>
          item.PRIMARY_CCY == primary && item.SECONDARY_CCY == secondery
      );
      return rate?.RATE;
    },
    [rateDatas]
  );
  useEffect(() => {
    setCurrencySwitch1(false);
    let rate = getRate(direction_ccy, ref_ccy);
    if (!rate) {
      rate = getRate(ref_ccy, direction_ccy);
      setCurrencySwitch1(true);
    }
    setValue("exchange_rate1", rate ? rate : 0);
  }, [acc_ccy, direction_ccy, getRate, ref_ccy, setValue]);

  useEffect(() => {
    setCurrencySwitch2(false);
    let rate = getRate(ref_ccy, acc_ccy);
    if (!rate) {
      rate = getRate(acc_ccy, ref_ccy);
      setCurrencySwitch2(true);
    }
    setValue("exchange_rate2", rate ? rate : 0);
  }, [acc_ccy, getRate, ref_ccy, setValue]);

  useEffect(() => {
    if (direction_ccy === acc_ccy) {
      setValue("ref_ccy", direction_ccy);
    } else if (productData) {
      const data = productData?.data?.rows?.find(
        (item: any, index: number) => item.PRODUCT_ID == productname?.PRODUCT_ID
      );
      setValue("ref_ccy", data?.REF_CCY);
    } else {
      setValue("ref_ccy", "USD");
    }
  }, [acc_ccy, direction_ccy, productData, productname, setValue]);

  useEffect(() => {
    let weSell = we_sell?.toLocaleString();
    let refAmount = 0;
    let debitAmount = 0;

    if (currencySwitch1) {
      refAmount = parseFloat(weSell?.replace(/,/g, "")) / exchange_rate1;
    } else {
      refAmount = parseFloat(weSell?.replace(/,/g, "")) * exchange_rate1;
    }

    if (currencySwitch2) {
      debitAmount = refAmount / exchange_rate2;
    } else {
      debitAmount = refAmount * exchange_rate2;
    }

    setValue("ref_amount", refAmount);
    setValue("debit_amount", debitAmount);
  }, [
    we_sell,
    exchange_rate1,
    exchange_rate2,
    currencySwitch1,
    currencySwitch2,
    setValue,
  ]);

  useEffect(() => {
    if (rateData) {
      setRateDatas(rateData?.data);
    }
  }, [rateData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-6 py-3 ">
      <TradesCreateHeader productIsLoading={productIsLoading} tradesId={""} />
      <div className=" grid grid-cols-2  mt-3 overflow-auto overflow-y">
        <TradesCreateLeftSection
          register={register}
          watch={watch}
          setValue={setValue}
          control={control}
          errors={errors}
          productname={productname}
          setProductValue={setProductValue}
          acc_ccy={acc_ccy}
          branchsDatas = {branchsDatas}
          setNostro_acct={setNostro_acct}
          dorm_accno={dorm_accno}
          showFormA={showFormA}
          account_balance={
            accountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0]
              ?.net_balance
          }
          showDorm={showDorm}
          showAllocation={showAllocation}
          setProductname={setProductname}
        />
        <TradesCreateRightSection
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          currencyDatas={currencyDatas}
          setDirection_ccy={setDirection_ccy}
          direction_ccy={direction_ccy}
          acc_ccy={acc_ccy}
          // exchange_rate1={exchange_rate1}
          // debitAmount={debitAmount}
          // exchange_rate2={exchange_rate2}
          // ref_amount={referenceCurrency}
          showAllocation={showAllocation}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default TradesCreate;
