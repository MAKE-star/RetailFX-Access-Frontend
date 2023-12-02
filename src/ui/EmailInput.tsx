import React from "react";
import { TEmailInput } from "./types";

const EmailInput = ({ label, value }: TEmailInput) => {
  return (
    <div className=" w-full mt-4">
      <label className=" text-sm font-normal">{label}</label>
      <div className="bg-gray-300 rounded flex px-5 py-1 justify-between mt-1">
        <p>{value}</p>
        <i className="bi bi-lock text-gray-400"></i>
      </div>
    </div>
  );
};

export default EmailInput;
