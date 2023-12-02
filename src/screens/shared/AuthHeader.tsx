import React from "react";
import { TAuthHeader } from "./types";

const AuthHeader = ({ title, subTitle }: TAuthHeader) => {
  return (
    <>
      <p className="text-2xl  font-bold">{title}</p>
      <p className=" text-sm mt-2 font-bold ">{subTitle}</p>
    </>
  );
};

export default AuthHeader;
