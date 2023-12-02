"use client";
import { Button, FormInput } from "@/ui";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TUserCreate } from "./types";
import { useUsersServices } from "@/services";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { option } from "@/lib";
import { useProductService } from "@/services/products";
import Select from "react-select";

const UserCreateContent = () => {
  const { useCreateUser } = useUsersServices();
  const { push } = useRouter();
  const { useGetProducts } = useProductService();
  const { data: products } = useGetProducts(1);

  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const [role, setRole] = useState("Maker");
  const [notification, setNotification] = useState(false);
  const [enable_rate, setEnable_rate] = useState(false);
  const {
    mutate: usersMutate,
    isLoading: usersLoading,
    isSuccess: usersIsSuccess,
    isError: usersIsError,
    error: usersError,
    data: usersData,
  } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TUserCreate>();
  const onSubmit: SubmitHandler<TUserCreate> = async (data) => {
    usersMutate(
      {
        ...data,
        products: data.products.map((product) => product.PRODUCT_ID),
        role_id: role == "Admin" ? 0 : role == "Maker" ? 1 : 2,
        notification: notification ? 1 : 0,
        enable_rate: enable_rate ? 1 : 0,
      },
      {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          setTimeout(() => {
            push("/users");
          }, 1000);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
      <div className=" flex justify-between items-center w-full  mb-2">
        <div>
        <Button
          href="/users"
          size= "sm"
          variant="primary"
          className=" text-sm font-normal"
        >
          <i className="bi bi-chevron-left "></i>Back
        </Button>
      </div>

        <Button
          variant="primary"
          className="text-sm font-normal"
          type="submit"
          size= "sm"
          disabled={usersLoading}
          loading={usersLoading}
        >
          Save
        </Button>
      </div>
      <div className="flex  items-center w-full  mt-5 ">
        <p className=" text-base font-bold">Create User</p>
      </div>
      <div className="grid grid-cols-5  items-start gap-8 pb-8">
        <h4 className="mt-4 font-medium col-span-1	 text-base">Method</h4>
        <div className=" col-span-4 flex gap-8">
          <Button
            type="button"
            variant={role == "Admin" ? "primaryOutline" : "secondaryGhost"}
            size="sm"
            className={`${
              role == "Admin" ? "" : "text-black"
            } mt-5 w-full  py-2.5  font-extralight`}
            onClick={() => setRole("Admin")}
          >
            <div className=" flex justify-center items-center">
              <i className="bi bi-person-fill-lock"></i>
              <p className="ml-1">Admin</p>
            </div>
          </Button>
          <Button
            variant={role == "Maker" ? "primaryOutline" : "secondaryGhost"}
            type="button"
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
            type="button"
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
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Authenticaion</h4>
        <div className=" col-span-4 flex gap-8">
          <FormInput
            label={"User Name*"}
            isInvalid={Boolean(errors?.username)}
            {...register("username", {
              required: "User name field is required",
            })}
          />
          <FormInput
            label={"Password*"}
            type="password"
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
        </div>
      </div>
      <div className="grid grid-cols-5 items-start gap-8 pb-4">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Personal</h4>
        <div className="col-span-4 flex gap-8">
          <FormInput
            label={"First Name*"}
            isInvalid={Boolean(errors?.first_name)}
            {...register("first_name", {
              required: "First name field is required",
            })}
          />
          <FormInput
            label={"Last name*"}
            isInvalid={Boolean(errors?.last_name)}
            {...register("last_name", {
              required: "Last name field is required",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start pb-4">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Contact</h4>
        <div className=" col-span-4 flex gap-8">
          <FormInput
            type="email"
            label="Email*"
            isInvalid={Boolean(errors?.email_id)}
            {...register("email_id", {
              required: "Email field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />

          <FormInput
            label="Phone number*"
            type="text"
            isInvalid={Boolean(errors?.phone_number)}
            {...register("phone_number", {
              required: "Phone number field is required",
            })}
          />
        </div>
      </div>
      <div className=" grid grid-cols-5  gap-10 border-b-2 border-gray-200 pb-6">
        <p className=" text-base mt-4 col-span-1 font-medium">Products</p>
        <div className="py-4 col-span-4">
          {products ? (
            <Controller
              name="products"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  getOptionLabel={(opt: any) => opt.PRODUCT_NAME}
                  getOptionValue={(opt: any) => opt.PRODUCT_ID}
                  isMulti
                  options={products?.data?.rows || []}
                />
              )}
            />
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-7 items-start pb-4">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Default Book</h4>
          <div className="col-span-6 flex gap-8 mt-3 ml-7 ">
            <FormInput
              label={""}
              isInvalid={Boolean(errors?.first_name)}
              {...register("book", {
                required: "Book field is required",
              })}
            />
            <p className=" text-base font-medium col-span-2 mt-1 ml-4">Email Notification</p>
            <div className=" col-span-4 flex items-center">
              <input
                type="checkbox"
                className=" h-4 w-4 focus-visible:bg-blue-900"
                checked={notification}
                onChange={(e: any) => setNotification(e?.target?.checked)}
              />
            </div>
          </div> 
      </div>

      <div className="grid grid-cols-4 items-start pb-4">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Allow Rate Change</h4>
          <div className="col-span-1 flex gap-4 mt-5 ml-4 ">
            <input
                type="checkbox"
                className=" h-4 w-4 focus-visible:bg-blue-900"
                checked={enable_rate}
                onChange={(e: any) => setEnable_rate(e?.target?.checked)}
              />
          {/*<FormInput
              label={" "}
              isInvalid={Boolean(errors?.enable_rate)}
              {...register("enable_rate", {
                required: "Enable Rate field is required",
              })}
            />
            */}
            {/*<FormSelect
                value={enable_rate}
                onChange={(e: any) => setEnable_rate(e.target.value)}
                className=" col-span-1"
                label={"Traded Currency"}
                disabled={false}
                options={}
            />*/}
          </div> 
      </div>
      {/*<div className=" grid grid-cols-5  gap-10 border-b-2 border-gray-200 pb-4">
        <p className=" text-base mt-4 col-span-1">Notification</p>
        <div className=" col-span-4 flex items-center mt-4">
          <input
            type="checkbox"
            className=" h-4 w-4 focus-visible:bg-blue-900"
            checked={notification}
            onChange={(e: any) => setNotification(e?.target?.checked)}
          />
          <p className=" text-sm pl-4 ">Email</p>
        </div>
            </div>*/}

      
      <ToastContainer />
    </form>
  );
};

export default UserCreateContent;
