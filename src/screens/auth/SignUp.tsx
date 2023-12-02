import React from "react";
import { TSignUp } from "./types";
import { SignUpBg } from "@/resources";
import { SignUpBody } from "@/components";
import { AuthHeader } from "../shared";

const SignUp = ({}: TSignUp) => {
  return (
    <div className="  w-full flex">
      <div className=" w-1/2 ">
        <SignUpBg />
      </div>
      <div className=" w-1/2">
        <div className="flex relative items-center justify-center h-full flex-col max-w-sm m-auto">
          <AuthHeader title="Sign Up" subTitle="Welcome to FX-Retail" />
          <SignUpBody />
          <p className=" absolute -left-10 bottom-3 text-gray-300 text-sm italic">
            @2023 FX Retail
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
