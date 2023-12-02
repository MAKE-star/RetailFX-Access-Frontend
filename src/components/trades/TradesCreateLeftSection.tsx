"use client";
import { useAuthContext } from "@/lib";
import { FormInput, FormSelect } from "@/ui";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import AsyncSelect from "react-select/async";
import productService from "@/services/products/products";
import branchSettleService from "@/services/branchsettles/branchsettles";
import { useQuery } from "react-query";
type Props = {};

const TradesCreateLeftSection = ({
  errors,
  register,
  control,
  productname,
  setProductname,
  acc_ccy,
  showFormA,
  branchsDatas,
  dorm_accno,
  setNostro_acct,
  account_balance,
  setProductValue,
  showDorm,
  showAllocation,
  setValue,
  watch,
  editMode = false,
}: {
  errors: any;
  register: any;
  watch: any;
  setValue: any;
  control: any;
  productname: any;
  setProductname: any;
  setProductValue: any;
  acc_ccy: any;
  dorm_accno: any;
  setNostro_acct: any;
  branchsDatas: any;
  showFormA: boolean;
  account_balance: number;
  showDorm: boolean;
  showAllocation: boolean;
  editMode?: boolean;
}) => {
  const auth: any = useAuthContext();
  const { user } = auth ?? {};
  const { ROLE_ID } = user ?? {};
  const [inputValue, setInputValue] = useState<any>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const {
    isLoading: tagIsLoading,
    error: tagError,
    data: searchData,
    refetch: RefetchProduct,
  } = useQuery([inputValue], () => productService.searchProduct(inputValue));

  const {
    isLoading: tagsIsLoading,
    error: tagsError,
    data: branchsData,
    refetch: RefetchBranch,
  } = useQuery([inputValue], () => branchSettleService.getNostroAccounts(inputValue));

  let debounceTimeout: any;

  const loadOptions = (newValue: any, callback: any) => {
    setInputValue(newValue);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      RefetchProduct(newValue).then((searchData) => {
        callback(searchData?.data?.data);
      });
    }, 300);
  };

  const loadOption = (newValue: any, callback: any) => {
    setInputValue(newValue);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      RefetchBranch(newValue).then((branchsData) => {
        callback(branchsData?.data?.data);
      });
    }, 300);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);

  const blackBorder = {
    color: "black !important", 
   };
  return (
    <div className=" col-span-1 border-r-[1.5px]  pr-12 border-gray-200">
      <div className=" grid grid-cols-2 gap-x-5">
        <div className=" col-span-2 grid grid-cols-2 items-center gap-x-5 ">
          <div className=" col-span-1 flex flex-col">
            <label className="text-sm font-normal">Trade Date</label>
            <DatePicker
              selected={watch("trade_date")}
              name="trade_date"
              disabled={ROLE_ID == 2}
              dateFormat="dd/MM/yyyy"
              className="bg-zinc-100 rounded-lg  border-2 focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
              onChange={(date: any) => setValue("trade_date", date)}
            />
          </div>
          <div className=" col-span-1">
            <label className=" text-sm  font-normal ">Product</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              value={productname}
              onChange={(value) => setProductValue(value)}
              isDisabled={ROLE_ID == 2 || editMode}
              defaultOptions
              getOptionLabel={(product) => product.PRODUCT_NAME}
              getOptionValue={(product) => product.PRODUCT_ID}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black", 
                  borderWidth: state.isFocused ? "1px" : "1px",
                  //borderColor: state.isFocused ? "white" : "white",
                  borderRadius: "10px",
                  backgroundColor: "#f4f4f5",
                  paddingTop: "2.5px",
                  paddingBottom: "2.5px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "black", 
                }),
              }}
            />

            {/*  <Select
              placeholder="Select an option"
              className="basic-single mt-2 "
              value={productname}
              name="Select product"
              required
              onChange={(value: any) => setProductValue(value)}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "white" : "white",
                  backgroundColor: "#f4f4f5",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }),
              }}
              classNamePrefix="select"
              options={[
                {
                  value: "",
                  label: "Select Product",
                  isDisabled: true,
                },
                ...productDatas,
              ]}
            />  */}
            {/*               )}
            /> */}
            {errors.selectedOption && (
              <p className="error">{errors.selectedOption.message}</p>
            )}
          </div>
        </div>

        <FormInput
          label="Customer Reference"
          type="text"
          className=" col-span-1 cursor-not-allowed"
          disabled={true}
          isInvalid={Boolean(errors?.customer_ref)}
          {...register("customer_ref")}
        />

        <FormInput
          label="Branch"
          type="text"
          disabled={true}
          className=" col-span-1 cursor-not-allowed"
          isInvalid={Boolean(errors?.branch)}
          {...register("branch", {
            required: "Branch field is required",
          })}
        />

        <FormInput
          label="Account Number"
          type="number"
          disabled={ROLE_ID == 2}
          className=" col-span-1"
          isInvalid={Boolean(errors?.acc_no)}
          {...register("acc_no", {
            required: "Account Number field is required",
          })}
        />
        <FormInput
          label="Account Name"
          type="text"
          className=" col-span-1"
          disabled={true}
          isInvalid={Boolean(errors?.acc_name)}
          {...register("acc_name", {
            required: "Account name field is required",
          })}
        />
        {/*  <FormInput
          label="Account Balance"
          type="number"
          placeholder="0.00"
          disabled={true}
          className=" col-span-1 cursor-not-allowed text-right"
          isInvalid={Boolean(errors?.acc_balance)}
          {...register("acc_balance", {
            required: "Account Balance field is required",
          })}
          // inputRightLable={acc_ccy}
        /> */}
        <div className=" mt-4">
          <label className=" text-sm">Account Balance</label>

          <CurrencyTextField
            label=" "
            variant="standard"
            value={watch("acc_balance")}
            currencySymbol={""}
            disabled
            decimalPlaces={2}
            outputFormat="string"
            className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full"
          />
        </div>
        <FormInput
          label="Account Currency"
          type="text"
          // placeholder="USD"
          disabled={true}
          className=" col-span-1 cursor-not-allowed"
          isInvalid={Boolean(errors?.acc_currency)}
          {...register("acc_currency", {
            required: "Account Currency field is required",
          })}
        />
        {showDorm && (
          <>
            <FormInput
              label="Transfer Account Number"
              type="text"
              placeholder=""
              className=" col-span-1"
              isInvalid={Boolean(errors?.dorm_accno)}
              {...register("dorm_accno", {
                required: "Dorm Account Number field is required",
              })}
            />
            <FormInput
              label="Transfer Account Name"
              type="text"
              placeholder=""
              disabled={true}
              className=" col-span-1 cursor-not-allowed"
              isInvalid={Boolean(errors?.dorm_accname)}
              {...register("dorm_accname", {
                required: "Dorm Settle Account field is required",
              })}
            />
            <FormInput
              label="Transfer Acct. Currency"
              type="text"
              // placeholder="USD"
              disabled={true}
              className=" col-span-1 cursor-not-allowed"
              isInvalid={Boolean(errors?.dormacc_currency)}
              {...register("dormacc_currency", {
                required: "Dorm Account Currency field is required",
              })}
            />
          </>
        )}
        {showAllocation && (
          <>
            <FormSelect
              value={dorm_accno}
              onChange={(e: any) => setNostro_acct(e.target.value)}
              className=" col-span-1"
              label={"Nostro Settlement Account"}
              disabled={ROLE_ID == 2}
              options={branchsDatas}
        />

          {/*<div className=" col-span-1">
            <label className=" text-sm  font-normal ">Nostro Settlement Account</label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOption}
              value={nostro_acct}
              onChange={(value) => setNostro_acct(value)}
              isDisabled={ROLE_ID == 2 || editMode}
              defaultOptions
              getOptionLabel={(branchData) => branchData.BR_SETTLE_ACCT}
              getOptionValue={(branchData) => branchData.BR_SETTLE_ACCT}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black", 
                  borderWidth: state.isFocused ? "1px" : "1px",
                  //borderColor: state.isFocused ? "white" : "white",
                  borderRadius: "10px",
                  backgroundColor: "#f4f4f5",
                  paddingTop: "2.5px",
                  paddingBottom: "2.5px",
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: "black", 
                }),
              }}
            />
            {errors.selectedOption && (
              <p className="error">{errors.selectedOption.message}</p>
            )}
            </div>*/}
          </>
            )}
        {showFormA && (
          <>
            <FormInput  
              label="Purpose for transferer"
              type="text"
              placeholder=""
              className=" col-span-1"
              isInvalid={Boolean(errors?.transfer_purpose)}
              {...register("transfer_purpose")}
              disabled={ROLE_ID == 2}
            />
            <FormInput
              label="Form A Number"
              type="text"
              className=" col-span-1"
              isInvalid={Boolean(errors?.form_a_no)}
              disabled={ROLE_ID == 2}
              {...register("form_a_no")}
            />
            <FormInput
              label="Passport Number"
              type="text"
              className=" col-span-1"
              isInvalid={Boolean(errors?.passport_no)}
              disabled={ROLE_ID == 2}
              {...register("passport_no")}
            />
            <FormInput
              label="Country for travel"
              type="text"
              placeholder=""
              className=" col-span-1"
              isInvalid={Boolean(errors?.travel_country)}
              disabled={ROLE_ID == 2}
              {...register("travel_country")}
            />
            <FormInput
              label="E Ticket Number"
              type="text"
              placeholder=""
              className=" col-span-1"
              isInvalid={Boolean(errors?.e_ticket_no)}
              disabled={ROLE_ID == 2}
              {...register("e_ticket_no")}
            />
            <FormInput
              label="Application Number"
              type="text"
              placeholder=""
              className=" col-span-1"
              isInvalid={Boolean(errors?.application_no)}
              disabled={ROLE_ID == 2}
              {...register("application_no")}
            />
            <div className=" col-span-1 mt-4 flex flex-col">
              <label className="text-sm font-normal">Travel date</label>
              <DatePicker
                selected={watch("travel_date")}
                name="travel_date"
                dateFormat="dd/MM/yyyy"
                disabled={ROLE_ID == 2}
                className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
                onChange={(date: any) => setValue("travel_date", date)}
              />
            </div>
          </>
        )}

        <div className=" col-span-2 w-full">
          <FormInput
            label="Comment"
            type="text"
            name="comment"
            disabled={ROLE_ID == 2}
            isInvalid={Boolean(errors?.comment)}
            {...register("comment")}
          />
        </div>
        <div className=" col-span-2 ">
          <FormInput
            label="Authorizer comment"
            type="text"
            disabled={ROLE_ID == 1}
            className=" col-span-2"
            isInvalid={Boolean(errors?.authorizer_comment)}
            {...register("authorizer_comment")}
          />
        </div>
      </div>
    </div>
  );
};

export default TradesCreateLeftSection;
