import { FormInput } from "@/ui";
import EmailInput from "@/ui/EmailInput";
import React from "react";

const UserViewContent = () => {
  return (
    <div className="divide-y">
      <div className="flex items-start gap-8 pb-8">
        <h4 className="mt-4 font-medium	 text-base">Personal</h4>
        <FormInput
          label={"First Name"}
          isInvalid={false}
          value={"joe"}
          disabled={true}
        />
        <FormInput
          label={"Last name"}
          isInvalid={false}
          value={"john"}
          disabled={true}
        />
      </div>
      <div className="flex items-start gap-8 pb-8">
        <h4 className="mt-4 font-medium	 text-base">Contact</h4>
        <EmailInput label="Email address" value="john@gmail.com" />
        <FormInput
          label="Phone number"
          type="number"
          name="phoneNumber"
          value={+91987654345}
          isInvalid={false}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default UserViewContent;
