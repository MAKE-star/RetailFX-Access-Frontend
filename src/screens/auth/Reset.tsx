import React from "react";
import { TReset } from "./types";
import { AuthHeader } from "../shared";
import { ResetBody } from "@/components";

const Reset = ({}: TReset) => {
  return (
    <div className="flex items-center justify-center h-screen flex-col max-w-md m-auto">
      <AuthHeader title="Reset password" subTitle="Enter your new password" />
      <ResetBody />
      <p className=" absolute bottom-10 text-sm ">@2023 FX Retail</p>
    </div>
  );
};

export default Reset;
