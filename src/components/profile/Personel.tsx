import { FormInput } from "@/ui";
import React from "react";

type Props = {};

const Personel = (props: Props) => {
  return (
    <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4">Personal</p>
      <FormInput
        label="First Name*"
        type="text"
        name="firstName"
        isInvalid={false}
      />
      <FormInput
        label="Last Name*"
        type="text"
        name="lastName"
        isInvalid={false}
      />
    </div>
  );
};

export default Personel;
