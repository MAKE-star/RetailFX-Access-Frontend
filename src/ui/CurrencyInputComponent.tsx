import React from "react";
import CurrencyInput from "react-currency-input-field";
type TCurrencyInput = {
  name: string;
  label: string;
  disabled: boolean;
  id?: any;
  placeholder: any;
  value?: any;
  inputRightLable?: any;
  isInvalid?: any;
  register?: any;
  watch?: any;
  register_name?: any;
};

const CurrencyInputComponent = ({
  disabled,
  label,
  id,
  name,
  placeholder,
  value,
  inputRightLable,
  register_name,
  isInvalid,
  register,
  watch,
}: TCurrencyInput) => {
  // let a = watch("we_sell");
  return (
    <div className="w-full">
      <label className=" text-sm font-normal">{label}</label>
      <div className="relative">
        <CurrencyInput
          id={id}
          name={name}
          placeholder={placeholder}
          className={
            isInvalid
              ? "bg-zinc-100 focus:border-solid focus:border-red-600 text-sm text-right focus:border-b-2 mt-1 px-2 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-3 focus-visible:outline-none w-full relative"
              : "bg-zinc-100 focus:border-solid focus:border-blue-900 text-sm focus:border-b-2 px-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 text-right focus:bg-white py-3 focus-visible:outline-none w-full "
          }
          // decimalsLimit={2}
          // allowNegativeValue={false}
          isInvalid={isInvalid}
          disabled={disabled}
          // value={a}
          {...register(name, {
            required: `${register_name} field is required`,
          })}
        />
        <div className="absolute bottom-0 left-0 top-3 pt-1 pl-3">
          {inputRightLable}
        </div>
      </div>
    </div>
  );
};

export default CurrencyInputComponent;
