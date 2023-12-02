import React from "react";
import { TForgotPassword } from "./types";
import { ForgotPasswordBody } from "@/components";
import { AuthHeader } from "../shared";

const ForgotPassword = ({}: TForgotPassword) => {
  return (
    <div className="flex items-center justify-center h-screen flex-col max-w-md m-auto">
      <AuthHeader
        title="Forgot Password?"
        subTitle="Enter your email to reset your password"
      />
      <ForgotPasswordBody />
      <p className=" absolute bottom-10 text-sm ">@2023 FX Retail</p>
    </div>
  );
};

export default ForgotPassword;
