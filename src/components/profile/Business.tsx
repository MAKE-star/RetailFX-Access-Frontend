import { FormInput } from "@/ui";
import React from "react";

const Business = ({}) => {
  return (
    <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4">Business</p>
      <FormInput
        label="Department"
        type="text"
        name="department"
        isInvalid={false}
      />
      <FormInput
        label="Position"
        type="text"
        name="position"
        isInvalid={false}
      />
    </div>
  );
};

export default Business;
