import React from "react";
import { SelectProps } from "./interface";

const FormSelect = React.forwardRef<HTMLInputElement, SelectProps>(
  ({ className, filter, label, options, ...props }, ref) => {
    return (
      <div className={` w-full ${label && "mt-4"} `}>
        {label && <label className=" text-sm font-normal">{label}</label>}

        <div className={` ${label && "mb-2"} relative`}>
          <select
            className={
              filter
                ? `bg-zinc-100 py-2.5 text-xs px-8 w-full text-sm capitalize rounded-lg`
                : ` bg-zinc-100 py-2.5 w-full text-sm disabled:cursor-not-allowed disabled:bg-zinc-300  focus-visible:outline-none focus:border-b-2  focus:border-solid focus:border-blue-900 focus:bg-white capitalize ${
                    label && "mt-1"
                  } ${className} rounded-lg`
            }
            {...props}
          >
            <option className=" text-black capitalize" hidden={true}>
              {`Select ${label}`}
            </option>
            {options?.map((item: any, index: number) => {
              return (
                <option
                  className=" text-black capitalize"
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </option>
              );
            })}
          </select>
          {filter && (
            <div className="w-5 h-5 absolute bottom-2 font-semibold top-2  px-2">
              <i className="bi bi-funnel-fill text-blue-900"></i>
            </div>
          )}
        </div>
      </div>
    );
  }
);
FormSelect.displayName = "Select";

export { FormSelect };
