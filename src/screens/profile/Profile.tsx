"use client";
import { option, useAuthContext } from "@/lib";
import { useUsersServices } from "@/services";
import { Button, FormInput } from "@/ui";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const Profile = () => {
  const { push } = useRouter();
  const { useEditUser } = useUsersServices();
  const [email, setEmail] = useState("");
  const auth: any = useAuthContext();
  const { user, getMe } = auth ?? {};
  const [showPass, setShowPass] = useState(false);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserUpdate>();
  const notify = (message: any, tag?: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const { mutate: editUserMutate, isLoading } = useEditUser();
  const onSubmit: SubmitHandler<TUserUpdate> = async (data) => {
    const payload = Boolean(data.password)
      ? {
          ...data,
          password: data.password,
          userId: user?.ID,
        }
      : {
          first_name: data?.first_name,
          last_name: data?.last_name,
          email_id: data?.email_id,
          phone_no: data?.phone_no,
          userId: user?.ID,
        };

    editUserMutate(payload, {
      onError(error: any) {
        notify(error?.response?.data?.message, "err");
        getMe();
      },
      onSuccess() {
        notify("Successfully Updated");
        getMe();
        if (Boolean(data.password)) {
          push("/sign-in");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" max-w-2xl m-auto  mt-5">
        <div className=" flex justify-between items-center pt-10 w-full">
          <div>
            <Button
              href="/dashboard"
              size= "sm"
              variant="primary"
              className=" text-sm font-normal"
            >
              <i className="bi bi-chevron-left "></i>Back
            </Button>
          </div>
          <Button
            type="submit"
            size= "sm"
            loading={isLoading}
            disabled={isLoading}
            className="text-sm bg-blue-900 text-white p-2 py-1 font-normal"
          >
            Update Profile
          </Button>
        </div>
        <div>
        <p className=" text-base mt-5 font-semibold">Profile</p>
        </div>
        <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
          <p className=" text-base mt-4">Personal</p>
          <FormInput
            label="First Name*"
            type="text"
            isInvalid={Boolean(errors?.first_name)}
            {...register("first_name", {
              required: "First name field is required",
            })}
            defaultValue={user?.FIRST_NAME}
          />
          <FormInput
            label="Last Name*"
            type="text"
            isInvalid={Boolean(errors?.last_name)}
            {...register("last_name", {
              required: "First name field is required",
            })}
            defaultValue={user?.LAST_NAME}
          />
        </div>
        <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
          <p className=" text-base mt-4">Contact</p>
          <FormInput
            label="Email Address*"
            type="email"
            isInvalid={Boolean(errors?.email_id)}
            {...register("email_id", {
              required: "Email field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            defaultValue={user?.EMAIL_ID}
          />
          <FormInput
            label="Phone number*"
            type="text"
            isInvalid={Boolean(errors?.phone_no)}
            {...register("phone_no", {
              required: "Phone number field is required",
            })}
            defaultValue={user?.PHONE_NO}
          />
        </div>
        <div className=" flex gap-10 items-center justify-between ">
          <p className=" text-base mt-4 ">Password</p>

          <div className="w-full mt-2">
            {showPass ? (
              <FormInput
                label="Password"
                type="text"
                isInvalid={Boolean(errors?.password)}
                {...register("password")}
              />
            ) : (
              <Button
                onClick={showPassword}
                className="text-sm bg-blue-900 mt-8 text-white p-2 py-1 font-normal "
                size= "sm"
              >
                Show Password
              </Button>
            )}
          </div>
        </div>

        {/* <Business /> */}
        {/* <Notification /> */}
        {/* <UserDeactivateButton /> */}
      </div>
      <ToastContainer />
    </form>
  );
};

export default Profile;
