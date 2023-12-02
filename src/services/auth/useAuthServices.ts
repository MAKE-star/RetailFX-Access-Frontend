"use client";

import { useMutation } from "react-query";
import authService from "./auth";
import { SIGNIN, SIGNUP, RESET, FORGOTpassword } from "./constants";
import { TSignUp } from "./types";
import { TUseMutationOption } from "../types";

const useAuthService = () => {
  const useSignin = (options?: TUseMutationOption) =>
    useMutation(SIGNIN, authService.signin, options);
  const useSignup = (options?: TUseMutationOption) =>
    useMutation(SIGNUP, authService.signup, options);
  const useForgotPassword = () =>
    useMutation(FORGOTpassword, authService.forgotPassword);
  const useReset = () => useMutation(RESET, authService.reset);
  return { useSignin, useSignup, useForgotPassword, useReset };
};

export default useAuthService;
