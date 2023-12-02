import { FormInput } from "@/ui";
import EmailInput from "@/ui/EmailInput";
import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4">Contact</p>
      <EmailInput label="Email address" value="john@gmail.com" />
      <FormInput
        label="Phone number"
        type="number"
        name="phoneNumber"
        isInvalid={false}
      />
    </div>
  );
};

export default Contact;
