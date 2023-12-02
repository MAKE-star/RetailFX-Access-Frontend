import * as React from "react";
import { InputProps } from "./interface";
import "bootstrap-icons/font/bootstrap-icons.css";

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      parentClassName,
      disabled,
      label,
      inputLeftIcon,
      inputLeftLable,
      inputRightLable,
      inputRIghtIcon,
      helperText,
      isInvalid,
      ...props
    },
    ref
  ) => {
    return (
      <div className={` w-full ${label && "mt-4"} ${parentClassName}  `}>
        {label && <label className=" text-sm font-normal">{label}</label>}

        <div className={` ${label && "mb-2"} relative`}>
          {inputRightLable && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span className="text-gray-500 pr-2 sm:text-sm">
                {inputRightLable}
              </span>
            </div>
          )}
          {inputLeftLable && (
            <div className="absolute inset-y-0 left-0 flex items-center">
              <span className="text-gray-500 sm:text-sm pl-2">
                {inputLeftLable}
              </span>
            </div>
          )}
          <input
            type="text"
            name="price"
            id="price"
            disabled={disabled ? disabled : false}
            className={`bg-zinc-100 focus:border-solid text-sm focus:border-blue-900 focus:border-b-2 mt-1 disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white py-1.5 rounded focus-visible:outline-none w-full ${className}
            ${inputLeftIcon || inputLeftLable ? "pl-10" : "pl-2"} 
            ${(inputRIghtIcon || inputRightLable) && "pr-10 "} 
             ${
               isInvalid
                 ? "border-b-2 focus:border-red-600 border-red-600 text-red-600"
                 : "text-black"
             }`}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label className="sr-only">Currency</label>
            {inputRIghtIcon && (
              <i className={` mr-2 bi bi-${inputRIghtIcon}`}></i>
            )}
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center">
            {inputLeftIcon && <i className={`ml-2 bi bi-${inputLeftIcon}`}></i>}
          </div>
        </div>
        {helperText && (
          <small className={`${isInvalid ? "text-red-500" : "text-black"}`}>
            {helperText}
          </small>
        )}
      </div>
    );
  }
);
FormInput.displayName = "Input";

export { FormInput };
