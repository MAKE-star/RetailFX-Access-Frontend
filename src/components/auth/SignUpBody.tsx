"use client";
import React, { useEffect, useState } from "react";
import { Button, FormInput } from "@/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSignUpForm } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/services";
import { Loading } from "@/resources";

const SignInBody = () => {
  const { push } = useRouter();

  const { useSignup } = useAuthService();
  const {
    mutate: signUpMutate,
    isLoading: signUpLoading,
    isSuccess: signUpIsSuccess,
    isError: signUpIsError,
    error: signUpError,
    data: signUpData,
  } = useSignup();
  const [role, setRole] = useState("Checker");
  useEffect(() => {
    if (signUpIsSuccess && signUpData.status == 200) {
      push("/sign-in");
    }
  }, [signUpIsSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpForm>();
  const onSubmit: SubmitHandler<TSignUpForm> = async (data) =>
    signUpMutate({ ...data, role_id: role == "Maker" ? 1 : 2 });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
      <div className=" flex gap-5 w-full">
        <FormInput
          label="First Name*"
          type="text"
          className="w-full"
          isInvalid={Boolean(errors?.first_name)}
          {...register("first_name", {
            required: "First name field is required",
          })}
        />
        <FormInput
          label="Last Name*"
          type="text"
          isInvalid={Boolean(errors?.last_name)}
          {...register("last_name", {
            required: "Last name field is required",
          })}
        />
      </div>
      <FormInput
        label="Customer Id*"
        type="text"
        isInvalid={Boolean(errors?.customer_id)}
        {...register("customer_id", {
          required: "Customer Id field is required",
        })}
      />
      <FormInput
        label="Email*"
        type="email"
        isInvalid={Boolean(errors?.email_id)}
        {...register("email_id", { required: "Email field is required" })}
      />

      <div className=" w-full mt-5">
        <p className=" text-left text-sm">I am a*</p>
        <div className="flex gap-5 ">
          <Button
            variant={role == "Maker" ? "primaryOutline" : "secondaryGhost"}
            size="sm"
            className={`${
              role == "Maker" ? "" : "text-black"
            } mt-5 w-full  py-2.5  font-extralight`}
            onClick={() => setRole("Maker")}
          >
            <div className=" flex justify-center items-center">
              <i className="bi bi-person-fill-add "></i>
              <p className="ml-1">Maker</p>
            </div>
          </Button>
          <Button
            variant={role == "Checker" ? "primaryOutline" : "secondaryGhost"}
            size="sm"
            className={`${
              role == "Checker" ? "" : "text-black"
            } mt-5 w-full  py-2.5  font-extralight`}
            onClick={() => setRole("Checker")}
          >
            <div className=" flex justify-center items-center">
              <i className="bi bi-person-check-fill "></i>
              <p className="ml-1">Checker</p>
            </div>
          </Button>
        </div>
      </div>
      <FormInput
        label="Password*"
        type="password"
        isInvalid={Boolean(errors?.password)}
        {...register("password", { required: "Email field is required" })}
      />
      <Button
        variant="primary"
        size="sm"
        className={`mt-5 w-full  py-2.5 font-extralight ${
          signUpLoading && "bg-blue-800"
        }`}
        type="submit"
        disabled={signUpLoading}
        loading={signUpLoading}
      >
        Sign Up
      </Button>
      <p className=" mt-5 text-sm">
        Already have an account ?
        <Button
          variant="primaryLink"
          href="/sign-in"
          size="sm"
          className=" mt-5 w-full  text-center font-extralight"
        >
          Login
        </Button>
      </p>
    </form>
  );
};

export default SignInBody;
