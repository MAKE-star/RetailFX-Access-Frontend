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
import { useParams, useRouter } from "next/navigation";
import { useProductService } from "@/services/products";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { GET_SINGLE_TRADE } from "@/services/trade/constants";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import useBranchServices from "@/services/branchsettles/useBranchServices";
import { useDebounce } from "@uidotdev/usehooks";

const TradesEdit = ({}) => {
  const params = useParams();
  const { tradesId } = params;
  const queryClient = useQueryClient();
  const [referenceCurrency, setReferenceCurrency] = useState(0);

  const [debitAmount, setDebitAmount] = useState(0);
  const { useEditTrade, useGetSingleTrade, useAccountDetails } =
    useTradeService();
  const { useGetProducts } = useProductService();
  const { useGetCurrencies, useGetRateTables } = useRateTableService();
  const { useGetBranchSettles, useGetBranchSettle } = useBranchServices();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const [productname, setProductname] = useState<any>({});
  const [status, setStatus] = useState("");
  const [productDatas, setProductDatas] = useState([]);
  const [currencyDatas, setCurrencyDatas] = useState([]);
  const [branchsDatas, setBranchsDatas] = useState([]);
  const [direction_ccy, setDirection_ccy] = useState("");
  const [dorm_accno, setNostro_acct] = useState("");
  const [acc_ccy, setAcc_ccy] = useState("");
  const [rateDatas, setRateDatas] = useState([]);

  const [showFormA, setShowFormA] = useState(false);
  const [showAllocation, setShowAllocation] = useState(false);
  const [currencySwitch1, setCurrencySwitch1] = useState(false);
  const [currencySwitch2, setCurrencySwitch2] = useState(false);

  const {
    data: singleTradesData,
    isSuccess: singleTradesIsSuccess,
    refetch: singleTradesRefetch,
  } = useGetSingleTrade(tradesId);
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
  const {
    data: productData,
    isLoading: productIsLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProducts(page);
  const { data: currenciesData } = useGetCurrencies();
  const { mutate: tradeMutate } = useEditTrade();
  const { mutate: tradeUpdateStatusMutate } = useEditTrade();
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
  } = useForm<TTradesCreate>({});
  const we_sell = watch("we_sell");
  const acc_no = watch("acc_no");
  const accountNumberDebounced = useDebounce(acc_no, 300);

 
  const dormAccNoDebounced = useDebounce(dorm_accno, 300);
  const { data: dormAccountDetailsData } =
    useAccountDetails(dormAccNoDebounced);

  const exchange_rate1 = watch("exchange_rate1");
  const exchange_rate2 = watch("exchange_rate2");
  const authorizer_comment = watch("authorizer_comment");
  const ref_ccy = watch("ref_ccy");
  const [showDorm, setShowDorm] = useState(false);
  const {
    data: accountDetailsData,
    isLoading: accountDetailsIsLoading,
    error: accountDetailsError,
    refetch: accountDetailsRefetch,
  } = useAccountDetails(accountNumberDebounced);
  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const updateStatus: SubmitHandler<TTradesCreate> = async (data: any) => {
    if (singleTradesData?.data?.STATUS === 1 ) {
      return;
    }

    tradeUpdateStatusMutate(
      {
        ...data,
        tradesId,
        product_id: productname.PRODUCT_ID,
        authorizer_comment,
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
  const custDebitAmount = watch("debit_amount");
  const accBalance = watch("acc_balance");
  useEffect(() => {
    if (rateData) {
      setRateDatas(rateData?.data);
    }
  }, [rateData]);

  const onSubmit: SubmitHandler<TTradesCreate> = async (data: any) => {
    if (singleTradesData?.data?.STATUS === 1) {
      return;
    }

    if (custDebitAmount > accBalance) {
      notify("Debit amount is greater than balance", "err");
      return;
    }

    const dormCurrency =
      dormAccountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0]
        ?.currency_code;

    if (showDorm && direction_ccy !== dormCurrency) {
      notify("Direction currency must match dorm account currency", "err");
      return;
    }

    tradeMutate(
      {
        ...data,
        we_sell_ccy: direction_ccy,
        tradesId,
        product_id: productname.PRODUCT_ID,
        direction_ccy,
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
    if (!singleTradesIsSuccess) return;

    // do not update rates if the trade is approved
    if (singleTradesData.data?.STATUS === 1) return;

    if ( direction_ccy) {
      setCurrencySwitch1(false);
      let rate = getRate(direction_ccy, ref_ccy);
      if (!rate) {
        rate = getRate(ref_ccy, direction_ccy);
        setCurrencySwitch1(true);
      }
      setValue("exchange_rate1", rate ? rate : 0);
    }

    if (acc_ccy || direction_ccy) {
      setCurrencySwitch2(false);
      let rate = getRate(ref_ccy, acc_ccy);
      if (!rate) {
        rate = getRate(acc_ccy, ref_ccy);
        setCurrencySwitch2(true);
      }
      setValue("exchange_rate2", rate ? rate : 0);
    }
  }, [
    acc_ccy,
    direction_ccy,
    getRate,
    ref_ccy,
    setValue,
    singleTradesData,
    singleTradesIsSuccess,
  ]);

  useEffect(() => {
    if (!singleTradesIsSuccess) return;

    // do not update values if the trade is approved
    if (singleTradesData.data?.STATUS === 1) return;

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
    singleTradesIsSuccess,
    singleTradesData,
  ]);

  useEffect(() => {
    if (productData && singleTradesData) {
      const { PRODUCT_ID } = singleTradesData.data ?? {};
      setProductname(
        productData?.data?.rows?.find((p: any) => p.PRODUCT_ID === PRODUCT_ID)
      );
      const data = productData?.data?.rows?.map((item: any, index: number) => {
        // if (index == 0) setProductname(item.PRODUCT_ID);
        return {
          label: item.PRODUCT_NAME,
          value: item.PRODUCT_ID,
        };
      });
      setProductDatas(data);
    }
  }, [productData, singleTradesData]);
  useEffect(() => {
    if (currenciesData) {
      const data = currenciesData?.data?.map((item: any, index: number) => {
        return {
          label: item.CURRENCY,
          value: item.CURRENCY,
        };
      });
      setCurrencyDatas(data);
    }
  }, [currenciesData]);
  
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
  
  useEffect(() => {
    if (singleTradesIsSuccess) {
      const {
        ID,
        TRADE_DATE,
        CUSTOMER_REF,
        PRODUCT_ID,
        ACC_NO,
        ACC_NAME,
        ACC_BALANCE,
        ACC_CURRENCY,
        BRANCH,
        DIRECTION,
        DIRECTION_CCY,
        WE_SELL,
        WE_SELL_CCY,
        //NOSTRO_ACCT,
        EXCHANGE_RATE1,
        DEBIT_AMOUNT,
        DEBIT_CCY,
        EXCHANGE_RATE2,
        REF_AMOUNT,
        REF_CCY,
        SELL_SETTLE_DATE,
        COMMENT,
        AUTHORIZER_COMMENT,
        STATUS,
        CUSTOMER_DEBIT_SETTLE_DATE,
        REFERENCE_CCY_SETTLE_DATE,
        TRANSFER_PURPOSE,
        FORM_A_NO,
        PASSPORT_NO,
        TRAVEL_COUNTRY,
        E_TICKET_NO,
        APPLICATION_NO,
        TRAVEL_DATE,
        SHOW_DORM,
        SHOW_FORMA,
        SHOW_ALLOCATION,
        ALLOCATION_DATE,
        DORM_ACCNO,
        DORM_ACCNAME,
        DORMACC_CURRENCY
      } = singleTradesData.data ?? {};
      setAcc_ccy(ACC_CURRENCY);
      setValue("trade_date", TRADE_DATE ? new Date(TRADE_DATE) : new Date());
      setValue("customer_ref", CUSTOMER_REF);
      setValue("acc_name", ACC_NAME);
      setValue("acc_no", ACC_NO);
      setValue("branch", BRANCH);
      setValue("acc_balance", ACC_BALANCE);
      setValue("acc_currency", ACC_CURRENCY);
      setValue("dormacc_currency", DORMACC_CURRENCY);
      setValue("comment", COMMENT);
      setValue("authorizer_comment", AUTHORIZER_COMMENT);
      setValue("we_sell", WE_SELL);
      setValue("we_sell_ccy", WE_SELL_CCY);
      setValue("exchange_rate1", EXCHANGE_RATE1);
      setValue(
        "sell_settle_date",
        SELL_SETTLE_DATE ? new Date(SELL_SETTLE_DATE) : new Date()
      );
      setValue("debit_amount", DEBIT_AMOUNT);
      setValue("debit_ccy", DEBIT_CCY);
      setValue("exchange_rate2", EXCHANGE_RATE2);
      setValue(
        "customer_debit_settle_date",
        CUSTOMER_DEBIT_SETTLE_DATE
          ? new Date(CUSTOMER_DEBIT_SETTLE_DATE)
          : new Date()
      );
      setValue(
        "reference_ccy_settle_date",
        REFERENCE_CCY_SETTLE_DATE
          ? new Date(REFERENCE_CCY_SETTLE_DATE)
          : new Date()
      );
      setValue("ref_amount", REF_AMOUNT);
      setValue("ref_ccy", REF_CCY);
      setValue("direction", DIRECTION);
      setValue("transfer_purpose", TRANSFER_PURPOSE);
      setValue("form_a_no", FORM_A_NO);
      setValue("passport_no", PASSPORT_NO);
      setValue("travel_country", TRAVEL_COUNTRY);
      setValue("e_ticket_no", E_TICKET_NO);
      setValue("application_no", APPLICATION_NO);
      setValue("travel_date", TRAVEL_DATE ? new Date(TRAVEL_DATE) :"");
      setValue(
        "allocation_date",
        ALLOCATION_DATE ? new Date(ALLOCATION_DATE) : new Date()
      );
      setValue("dorm_accname", DORM_ACCNAME);
      setValue("dorm_accno", DORM_ACCNO);
      setDirection_ccy(DIRECTION_CCY);
      setNostro_acct(DORM_ACCNO);
      setValue("ref_ccy", REF_CCY);

      setStatus(STATUS);
    }
  }, [setValue, singleTradesData, singleTradesIsSuccess]);
  useEffect(() => {
    if (accountDetailsData && acc_no?.length >= 10) {
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
    }
  }, [accountDetailsData, acc_no, setValue]);
  useEffect(() => {
    if (dormAccountDetailsData) {
      const { 
        account_name,
        currency_code,
       } =
        dormAccountDetailsData?.data?.data?.getcustomeracctsdetailsresp?.[0] ??
        {};
      setValue("dorm_accname", account_name);
      setValue("dormacc_currency", currency_code);
    }
  }, [dormAccountDetailsData, setValue]);

  useEffect(() => {
    if (acc_no === dorm_accno) {
      setError("dorm_accno", {
        message: "Dorm Account cannot be the same as primary account",
      });
    } else {
      clearErrors("dorm_accno");
    }
  }, [acc_no, clearErrors, dorm_accno, setError]);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: [GET_SINGLE_TRADE, tradesId] });
    };
  }, [queryClient, tradesId]);
  const setProductValue = (item: any) => {
    setProductname(item);
    if (productData) {
      setValue("acc_name", "");
      setValue("acc_no", "");
      setValue("customer_ref", "");
      setValue("branch", "");
      setValue("acc_currency", "");
      setValue("acc_balance", 0);
      setAcc_ccy("");
      const product = productData?.data?.rows?.find(
        (data: any, index: number) => data.PRODUCT_ID == item.value
      );

      if (direction_ccy !== acc_ccy) {
        setValue("ref_ccy", product?.REF_CCY);
      }
      setShowFormA(product?.SHOW_FORMA == "1");
      setShowDorm(product?.SHOW_DORM == "1");
      setShowAllocation(product?.SHOW_ALLOCATION == "1");
    }
  };
  useEffect(() => {
    if (productData) {
      const data = productData?.data?.rows?.find(
        (item: any, index: number) => item.PRODUCT_ID == productname?.PRODUCT_ID
      );
      setShowFormA(data?.SHOW_FORMA == "1");
      if (direction_ccy !== acc_ccy) {
        setValue("ref_ccy", data?.REF_CCY);
      }
      setShowAllocation(data?.SHOW_ALLOCATION == "1");
      setShowDorm(data?.SHOW_DORM == "1");
    }
  }, [acc_ccy, direction_ccy, productData, productname, setValue]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-6 py-3 ">
      <TradesCreateHeader
        productIsLoading={productIsLoading}
        tradesId={tradesId}
        updateStatus={updateStatus}
        status={status}
      />
      <div className="grid grid-cols-2 h-full mt-3">
        <TradesCreateLeftSection
          register={register}
          errors={errors}
          productname={productname}
          setProductname={setProductname}
          acc_ccy={acc_ccy}
          showFormA={showFormA}
          showDorm={showDorm}
          showAllocation={showAllocation}
          setProductValue={setProductValue}
          dorm_accno={dorm_accno}
          setNostro_acct={setNostro_acct}
          branchsDatas = {branchsDatas}
          account_balance={singleTradesData?.data?.[0]?.ACC_BALANCE}
          watch={watch}
          setValue={setValue}
          control={control}
          editMode
        />
        <TradesCreateRightSection
          status={singleTradesData?.data?.STATUS}
          direction_ccy={direction_ccy}
          setDirection_ccy={setDirection_ccy}
          currencyDatas={currencyDatas}
          register={register}
          errors={errors}
          acc_ccy={acc_ccy}
          // exchange_rate1={singleTradesData?.data?.EXCHANGE_RATE1}
          // exchange_rate2={singleTradesData?.data?.EXCHANGE_RATE2}
          showAllocation={showAllocation}
          // debitAmount={debitAmount}
          // ref_amount={referenceCurrency}
          // wesell={singleTradesData?.data?.WE_SELL}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <ToastContainer />
    </form>
  );
};

export default TradesEdit;
