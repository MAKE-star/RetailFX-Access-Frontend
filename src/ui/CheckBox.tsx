import React from "react";
import { TCheckBox } from "./types";
import { cn } from "@/lib";

const CheckBox = ({ checked, onChange }: TCheckBox) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          checked && "bg-blue-1100  text-blue-900 checked:bg-blue-1100"
        )}
      />
    </div>
  );
};

export default CheckBox;
