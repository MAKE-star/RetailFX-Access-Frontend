"use client";
import { Button, FormInput } from "@/ui";
import EmailInput from "@/ui/EmailInput";
import React, { useEffect, useState } from "react";
import { UserDeactivateButton } from ".";
import { useUsersServices } from "@/services";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TUserEdit } from "./types";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { option } from "@/lib";
import { useProductService } from "@/services/products";
import Select from "react-select";

const UserEditContent = ({}) => {
  const params = useParams();
  const { push } = useRouter();
  const { useGetProducts } = useProductService();
  const { data: products } = useGetProducts(1);

  const { userId } = params;
  const [notification, setNotification] = useState(true);
  const [enable_rate, setEnable_rate] = useState(true);
  

  const [userData, setuserData] = useState<TUserEdit>({
    first_name: "",
    last_name: "",
    customer_id: "",
    book: "",
    enable_rate: 0,
    phone_number: 0,
    username: "",
    password: "",
    products: [],
  });
  const [status, setStatus] = useState("0");
  const { useEditUser, useGetSingleUser, useDeleteUser, useDeactivateUser } =
    useUsersServices();
  const {
    data: singleUsersData,
    isLoading: singleUserIsLoading,
    error: singleUserError,
    isSuccess: singleUsersIsSuccess,
    refetch: singleUserRefetch,
  } = useGetSingleUser(userId);
  const { mutate: usersMutate, isLoading: usersLoading } = useEditUser();
  const { mutate: usersDeleteMutate, isLoading: usersDeleteLoading } =
    useDeleteUser();
  const { mutate: usersDeactivateMutate, isLoading: usersDeactivateLoading } =
    useDeactivateUser();
  const onDelete = () => {
    usersDeleteMutate(userId, {
      onError(error: any) {
        notify(error?.response?.data?.message, "err");
      },
      onSuccess(data) {
        notify(data?.data?.message, "success");
        setTimeout(() => {
          push("/users");
        }, 1000);
      },
    });
  };
  const onDeactivate = () => {
    usersDeactivateMutate(
      { userId, status: status == "1" ? "0" : "1" },
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    control,
  } = useForm<TUserEdit>({
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      customer_id: userData.customer_id,
      phone_number: userData.phone_number,
      book: userData.book,
      products: userData.products
    },
  });
  console.log("UserProducts",userData.products);
  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const onSubmit: SubmitHandler<TUserEdit> = async (data) =>
    usersMutate(
      {
        ...data,
        //products: data.products,
        products: data.products.map((product) => product.PRODUCT_ID),
        userId,
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
    

  useEffect(() => {
    if (singleUsersIsSuccess && products) {
      setuserData(singleUsersData.data);
      const {
        FIRST_NAME,
        LAST_NAME,
        PASSWORD,
        EMAIL_ID,
        PHONE_NO,
        ROLE_ID,
        USERNAME,
        BOOK,
        NOTIFICATION,
        ENABLE_RATE,
        IS_ACTIVE,
        products: userProducts,
      } = singleUsersData.data ?? {};
      setValue("username", USERNAME);
      // setValue("password", PASSWORD);
      setValue("first_name", FIRST_NAME);
      setValue("last_name", LAST_NAME);
      setValue("phone_number", PHONE_NO);
      setValue("enable_rate", ENABLE_RATE); 
      setValue("products", userProducts.rows || []);
      console.log("User Products", products);
      setStatus(IS_ACTIVE);
      setValue("book", BOOK);
      setNotification(NOTIFICATION == "1");
      setEnable_rate(ENABLE_RATE==1)
    }
  }, [setValue, singleUsersData, singleUsersIsSuccess, products]);

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
          className=" text-sm font-normal"
          type="submit"
          size= "sm"
          disabled={usersLoading}
          loading={usersLoading}
        >
          Save
        </Button>
      </div>
      <div className="flex items-center gap-3 pb-4">
        <h4 className="text-xl font-semibold">{`${singleUsersData?.data?.FIRST_NAME} ${singleUsersData?.data?.LAST_NAME}`}</h4>
        <p>
          {singleUsersData?.data?.ROLE_ID == "0"
            ? "Admin"
            : singleUsersData?.data?.ROLE_ID == "1"
            ? "Maker"
            : "Checker"}
        </p>
      </div>
      <div className="grid grid-cols-5 items-start pb-8">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Authenticaion</h4>
        <div className=" col-span-4 flex gap-8">
          <FormInput
            label={"User Name"}
            isInvalid={Boolean(errors?.username)}
            {...register("username", {
              required: "User name field is required",
            })}
          />
          {/*     <FormInput
            label={"Password"}
            type="password"
            isInvalid={Boolean(errors?.password)}
            {...register("password", {
              required: "Password field is required",
            })}
          /> */}
        </div>
      </div>
      <div className="grid grid-cols-5 items-start gap-8 pb-8">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Personal</h4>
        <div className="col-span-4 flex gap-8">
          <FormInput
            label={"First Name"}
            isInvalid={Boolean(errors?.first_name)}
            {...register("first_name", {
              required: "First name field is required",
            })}
          />
          <FormInput
            label={"Last name"}
            isInvalid={Boolean(errors?.last_name)}
            {...register("last_name", {
              required: "Last name field is required",
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 items-start pb-8">
        <h4 className="mt-4 font-medium	 text-base col-span-1">Contact</h4>
        <div className=" col-span-4 flex gap-8">
          <EmailInput
            label="Email address"
            value={singleUsersData?.data?.EMAIL_ID}
          />

          <FormInput
            label="Phone number"
            type="number"
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
                required: "First name field is required",
              })}
            />
            <p className=" text-base font-medium col-span-2 mt-1 ml-4">Notification</p>
            <div className=" col-span-4 flex items-center">
              <input
                type="checkbox"
                className=" h-4 w-4 focus-visible:bg-blue-900"
                checked={notification}
                onChange={(e: any) => setNotification(e?.target?.checked)}
              />
              <p className=" text-sm pl-4 ">Email</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 items-start pb-4">
          <h4 className="mt-4 font-medium	 text-base col-span-3">Allow Rate Change</h4>
          <div className="col-span-4 flex gap-4 mt-5 ml-4 ">
          <input
                type="checkbox"
                className=" h-4 w-4 focus-visible:bg-blue-900"
                checked={enable_rate}
                onChange={(e: any) => setEnable_rate(e?.target?.checked)}
              />
          </div> 
      </div>

      <UserDeactivateButton
        status={status}
        onDelete={onDelete}
        onDeactivate={onDeactivate}
      />
      <ToastContainer />
    </form>
  );
};

export default UserEditContent;
