import { Button, FormInput } from "@/ui";
import React from "react";

type Props = {};

const ResetBody = (props: Props) => {
  return (
    <>
      <>
        <FormInput
          label="New password*"
          name="newPassword"
          type="password"
          isInvalid={false}
        />
        <FormInput
          label="Re-type password*"
          name="rePassword"
          type="password"
          isInvalid={false}
        />
        <Button
          variant="primary"
          size="sm"
          className=" mt-5 w-full  py-2.5 font-normal"
        >
          Reset Password
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

export default ResetBody;
