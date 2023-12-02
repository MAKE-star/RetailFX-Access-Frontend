import { Button, FormInput } from "@/ui";
import React from "react";

type Props = {};

const ForgotPasswordBody = (props: Props) => {
  return (
    <>
      <>
        <FormInput
          label={"Email*"}
          name="email"
          type="email"
          isInvalid={false}
        />
        <Button
          variant="primary"
          size="sm"
          className=" mt-5 w-full  py-2.5 font-normal"
        >
          Send recovery email
        </Button>
        <p className=" mt-5 text-sm">
          Go back to
          <Button
            variant="primaryLink"
            href="/sign-in"
            size="sm"
            className=" mt-5 w-full  text-center font-normal"
          >
            Login
          </Button>
        </p>
      </>
    </>
  );
};

export default ForgotPasswordBody;
