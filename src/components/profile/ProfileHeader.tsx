import { Button } from "@/ui";
import React from "react";

type Props = {};

const ProfileHeader = (props: Props) => {
  return (
    <div className=" flex justify-between items-center pt-10 w-full">
      <div>
        <p className=" text-base font-semibold">Profile</p>
      </div>
      <Button variant="primary" className="text-sm font-normal" size= "sm">
        <label htmlFor="imageInput">Update Profile</label>
        <input
          type="file"
          id="imageInput"
          className="hidden"
          accept="image/*"
        />
      </Button>
    </div>
  );
};

export default ProfileHeader;
