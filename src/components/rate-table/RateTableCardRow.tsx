import React, { memo, useMemo, useState, useEffect } from "react";
import { TRateTableCardRow } from "./types";
import { Button, FormInput } from "@/ui";
import useRateTableService from "@/services/rate-table/useRateTableServices";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
import DeleteModal from "@/ui/DeleteModal";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import dayjs from "dayjs";

const RateTableCardRow = ({
  currency,
  currencyList,
  icon,
  refetch,
}: TRateTableCardRow) => {
  const [open, setOpen] = useState(false);
  const [rateId, setRateId] = useState<any>(0);
  const [currencyVal, setCurrencyVal] = useState(currencyList?.RATE);
  const { useDeleteRate, useEditRate } = useRateTableService();
  const [id, setId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrencyVal(currencyList?.RATE);
  }, [currencyList]);

  const deleteCurrencyModal = (id: any) => {
    setOpen(true);
    setRateId(id);
  };

  const { mutate: rateEditMutate, isLoading: rateLoading } = useEditRate();

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };

  const currencyUpdate = (currencyId: any) => {
    rateEditMutate(
      {
        primary_ccy: currency,
        secondary_ccy: currencyList?.SECONDARY_CCY,
        rate: currencyVal,
        rateId: currencyId,
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
          refetch();
          setId(0);
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          refetch();
          setId(0);
        },
      }
    );
  };

  const startEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const finishEditing = () => {
    setIsEditing(false);
        if (currencyVal !== currencyList?.RATE) {
      currencyUpdate(currencyList?.ID);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyVal(e.target.value);
  };

  /*const onSubmit = async () => {
    rateDeleteMutate(rateId, {
      onError(error: any) {
        notify(error?.response?.data?.message, "err");
        refetch();
      },
      onSuccess(data) {
        refetch();
      },
    });
  };*/

  return (
    <>
      <div className="flex w-full items-center mt-3 gap-5">
        <p>{dayjs(currencyList?.UPDATED_AT).format("DD/MM/YYYY")}</p>
        <div className="border-[1px] w-20 ml-10 border-gray-300 py-2 rounded">
          <p className="text-center">{currency}</p>
        </div>
        <i className="bi bi-repeat text-gray-300"></i>
        <div className="border-[1px] w-20 border-gray-300 py-2 rounded">
          <p className="text-center">{currencyList?.SECONDARY_CCY}</p>
        </div>
        {isEditing ? (
          <CurrencyTextField
            label=" "
            variant="standard"
            value={currencyVal}
            currencySymbol={""}
            onChange={(e: any) => handleTextChange(e)}
            decimalPlaces={4}
            style={{
              width: "96px",
            }}
            outputFormat="string"
            className="bg-zinc-100 focus:border-solid focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-3 focus-visible:outline-none w-24 my-3 text-right"
          />
        ) : (
          <p className="w-24 my-3 text-right ">
            {currencyVal ? Number(currencyVal).toFixed(4) : "-"}
          </p>
        )}

        {isEditing ? (
          <Button className="text-gray-800 bg-gray-50 border-0" onClick={finishEditing}>
            Save
          </Button>
        ) : (
          <p className="text-gray-800 cursor-pointer py-5 hover:underline ml-8" onClick={startEditing}>
            Edit
          </p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default memo(RateTableCardRow);
