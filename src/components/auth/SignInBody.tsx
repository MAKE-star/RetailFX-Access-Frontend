"use client";
import React, { useState } from "react";
import { Button, FormInput } from "@/ui";

import { TSignInForm } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "@/lib";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/services";
import { signIn } from "next-auth/react";

const SignInBody = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>();

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const onSubmit: SubmitHandler<TSignInForm> = async ({
    username,
    password,
  }) => {
    try {
      setIsLoading(true);
      if (!username || !password) {
        setLoginError("Please provide valid credentials");
      } else {
        await signIn("credentials", {
          username,
          password,
          redirect: false,
        })
          .then((res) => {
            if (res?.error !== null) {
              setLoginError("Please provide valid credentials");
              setInputValues({
                username: username, 
                password: "", 
              });
            }
            if (res?.ok) {
              push("/dashboard");
            }
          })
          .catch(() => {});
      }
    } catch (error: any) {
      console.log("failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-3/4">
      {/*    <FormInput label={"Email*"} type="email" name="email" isInvalid={false} /> */}
      <FormInput
        label="User Name*"
        type="text"
        helperText={errors?.username?.message}
        isInvalid={Boolean(errors?.username)}
        {...register("username", {
          required: "User Name field is required",
        })}
      />
      <FormInput
        label={"Password*"}
        type="password"
        helperText={errors?.password?.message}
        isInvalid={Boolean(errors?.password)}
        {...register("password", {
          required: "Password field is required",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message:
              "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
          },
        })}
      />
      <Button
        variant="primary"
        size="sm"
        className={`mt-5 w-full  py-2.5 font-normal ${
          isLoading && "bg-blue-800"
        }`}
        type="submit"
        disabled={isLoading}
        loading={isLoading}
      >
        Log in
      </Button>

      <label className="text-sm pt-3 text-red-600">{loginError}</label>
      {/* <Button
        variant="primaryLink"
        href="/forgot-password"
        size="sm"
        className=" mt-5 w-full decoration-solid	 decoration-1
        text-black text-center font-normal"
      >
        Forgot your password?
      </Button> */}
    </form>
  );
};

export default SignInBody;
