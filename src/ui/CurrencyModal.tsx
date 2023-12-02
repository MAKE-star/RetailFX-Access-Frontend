"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, FormInput } from ".";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { TRateCreate } from "@/components/rate-table/types";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import { option } from "@/lib";
type TCurrencyModal = {
  open: boolean;
  setOpen: any;
  header: string;
  label: string;
  btnText: string;
};

export default function CurrencyModal({
  open,
  setOpen,
  header,
  label,
  btnText,
}: TCurrencyModal) {
  const cancelButtonRef = useRef(null);

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };

  const { useCreateRates, useGetRateTables } = useRateTableService();

  const {
    mutate: currencyMutate,

    isLoading: currencyLoading,
    isSuccess: currencyIsSuccess,
    isError: currencyIsError,
    error: currencyError,
    data: currencyData,
  } = useCreateRates();
  const { refetch: rateRefetch } = useGetRateTables();

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<TRateCreate>();
  const onSubmit: SubmitHandler<TRateCreate> = async (data: any) => {
    currencyMutate(
      { ...data, rate: data.rate },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
          reset();
        },
        onSuccess(data) {
          rateRefetch();
          notify(data?.data?.message, "success");
          setOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <ToastContainer />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-700"
                        >
                          {header}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">{label}</p>
                        </div>

                        <FormInput
                          label={"Primary Currency"}
                          isInvalid={Boolean(errors?.primary_ccy)}
                          {...register("primary_ccy", {
                            required: "Primary currency field is required",
                          })}
                        />
                        <label className="text-xs text-gray-200">
                          eg.USD,EUR
                        </label>
                        <FormInput
                          label={"Secondary Currency"}
                          isInvalid={Boolean(errors?.secondary_ccy)}
                          {...register("secondary_ccy", {
                            required: "Secondary currency field is required",
                          })}
                        />
                        <label className="text-xs text-gray-200">
                          eg.USD,EUR
                        </label>
                        <FormInput
                          label={"Rate"}
                          isInvalid={Boolean(errors?.rate)}
                          {...register("rate", {
                            required: "Rate field is required",
                          })}
                        />
                        <FormInput
                          label={"Book"}
                          isInvalid={Boolean(errors?.book)}
                          {...register("book", {
                            required: "Book field is required",
                          })}
                        />
                      </div>
                    </div>
                    <div className=" py-2 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center  bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto rounded"
                        // disabled={currencyLoading}
                      >
                        {btnText}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center  px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-200 hover:bg-blue-350 sm:mt-0 sm:w-auto rounded"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
