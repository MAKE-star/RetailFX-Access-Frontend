"use client";
import { currency, direction, products, useAuthContext } from "@/lib";
import { FormInput, FormSelect } from "@/ui";
import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
type Props = {};

const TradesCreateRightSection = ({
  errors,
  register,
  currencyDatas,
  setDirection_ccy,
  direction_ccy,
  acc_ccy,
  showAllocation,
  setValue,
  watch,
  status,
}: any) => {
  const auth: any = useAuthContext();

  const { user } = auth ?? {};
  const { ROLE_ID } = user ?? {};
  const { ENABLE_RATE } = user ?? {};
  const debitAmount = watch("debit_amount");
  const accBalance = watch("acc_balance");

  return (
    <div className=" col-span-1 pl-12 h-full">
      <div className=" grid grid-cols-3 gap-x-5 border-b-[1.5px] border-gray-300 pb-5">
        <div className=" col-span-3 ">
          <div className=" flex gap-5">
            <FormInput
              label="Direction"
              type="text"
              name=""
              className=" col-span-1"
              disabled={true}
              isInvalid={Boolean(errors?.direction)}
              {...register("direction", {
                required: "Direction field is required",
              })}
            />

            <FormSelect
              value={direction_ccy}
              onChange={(e: any) => setDirection_ccy(e.target.value)}
              className=" col-span-1"
              label={"Traded Currency"}
              disabled={ROLE_ID == 2}
              options={currencyDatas}
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-x-5 border-b-[1.5px] border-gray-300 py-5">
        <div className=" col-span-3 ">
          <label className=" text-sm">We sell</label>
          <div className=" flex gap-5">
            <CurrencyTextField
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
              label=" "
              variant="standard"
              value={watch("we_sell")}
              disabled={ROLE_ID == 2 || status === 1}
              currencySymbol={direction_ccy}
              outputFormat="string"
              className="bg-zinc-100 focus:border-solid  w-full"
              onChange={(event: any, value: any) => setValue("we_sell", value)}
            />

            <CurrencyTextField
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
              label=" "
              variant="standard"
              value={watch("exchange_rate1")}
              decimalPlaces={4}
              currencySymbol="@"
              //disabled={true}
              disabled={ROLE_ID ==2 || ENABLE_RATE == 0}
              outputFormat="string"
              className="bg-zinc-100 focus:border-solid  w-full"
              onChange={(event: any, exchange_rate1: any) => setValue("exchange_rate1", exchange_rate1)}
            />
          </div>
        </div>
        {/*<div className=" col-span-2  mt-4 w-3/4">
          {!showAllocation ? (
            <div className=" col-span-1 flex flex-col">
              <label className="text-sm font-normal">Spot Date</label>
              <DatePicker
                selected={watch("reference_ccy_settle_date")}
                name="allocation_date"
                dateFormat="dd/MM/yyyy"
                disabled={true}
                className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
                onChange={(date: any) =>
                  setValue("allocation_date", date)
                }
              />
            </div>
          ) : (
            <div className=" col-span-1 flex flex-col">
              <label className="text-sm font-normal">Spot Date</label>
              <DatePicker
                selected={watch("reference_ccy_settle_date")}
                name="allocation_date"
                dateFormat="dd/MM/yyyy"
                disabled={true}
                className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full"
                onChange={(date: any) => setValue("allocation_date", date)}
              />
            </div>
          )}
        </div>*/}
        <div className=" col-span-2  mt-4 w-3/4">
            <div className=" col-span-1 flex flex-col">
              <label className="text-sm font-normal">Spot Date</label>
              <DatePicker
                selected={watch("reference_ccy_settle_date")}
                name="allocation_date"
                dateFormat="dd/MM/yyyy"
                disabled={true}
                className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
                onChange={(date: any) =>
                  setValue("allocation_date", date)
                }
              />
            </div>
          </div>
          </div>
      <div className=" grid grid-cols-3 gap-x-5 border-b-[1.5px] border-gray-300 py-5">
        <div className=" col-span-3 ">
          <label className=" text-sm">Reference Amount</label>
          <div className=" flex gap-5">
            {/*<div className="flex-shrink-0">*/}
              <CurrencyTextField
                style={{
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  borderBottom:
                    debitAmount > accBalance ? "1px solid red" : undefined,
                }}
                label=" "
                variant="standard"
                value={watch("ref_amount")}
                currencySymbol={watch("ref_ccy") || ""}
                disabled={true}
                outputFormat="string"
                className="bg-zinc-100 focus:border-solid  w-full"
                onChange={(event: any, ref_amount: any) => setValue("ref_amount", ref_amount)}
              />
            {/*</div> */}
            <CurrencyTextField
              label=" "
              variant="standard"
              value={watch("exchange_rate2")}
              decimalPlaces={4}
              currencySymbol="@"
              //disabled={true}
              disabled={ROLE_ID ==2 || ENABLE_RATE == 0}
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
              outputFormat="string"
              className="bg-zinc-100 focus:border-solid  w-full"
              onChange={(event: any, exchange_rate2: any) => setValue("exchange_rate2", exchange_rate2)}
            />
          </div>
        </div>

        <div className=" col-span-2 mt-4 w-3/4 ">
            <div className=" col-span-1 flex flex-col">
              <label className="text-sm font-normal">Reference Settle Date</label>
              <DatePicker
                selected={watch("reference_ccy_settle_date")}
                name="reference_ccy_settle_date"
                dateFormat="dd/MM/yyyy"
                disabled={ROLE_ID == 2}
                className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
                onChange={(date: any) =>
                  setValue("reference_ccy_settle_date", date)
                }
              />
            </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 items-center gap-x-5 py-5">
        <div className=" col-span-1 ">
          <label className=" text-sm">Customer Debit Amount</label>

          <div className=" flex gap-5">
            {/*    <FormInput
              label="Reference Amount"
              type="number"
              placeholder="0.00"
              className=" col-span-1 text-right"
              disabled={true}
              isInvalid={Boolean(errors?.ref_amount)}
              {...register("ref_amount", {
                required: "reference ccy Date field is required",
              })}
              inputLeftLable={proRefCcy}
            /> */}
            <CurrencyTextField
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
              label=" "
              variant="standard"
              value={watch("debit_amount")}
              currencySymbol={acc_ccy}
              disabled={true}
              outputFormat="string"
              className="bg-zinc-100 focus:border-solid  w-full"
              onChange={(debit_amount: any) =>
                setValue("debit_amount", debit_amount)
              }
            />
            {debitAmount > accBalance ? (
              <div className="text-xs text-red-500">
                Debit amount is greater than the balance.
              </div>
            ) : null}
          </div>
        </div>
        <div className=" col-span-1 flex flex-col">
          <label className="text-sm font-normal mt-4">Customer Settle Date</label>
          <DatePicker 
            selected={watch("trade_date")}
            name="customer_debit_settle_date"
            dateFormat="dd/MM/yyyy"
            disabled={true}
            className="bg-zinc-100 rounded-lg focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-2 focus-visible:outline-none w-full "
            onChange={(date: any) =>
              setValue("customer_debit_settle_date", date)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TradesCreateRightSection;
