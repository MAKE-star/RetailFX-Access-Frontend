import React from "react";
import { TUserView } from "./types";
import { UserViewContent } from "@/components/users";

const UserView = ({}: TUserView) => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex items-center gap-3 pb-4">
        <h4 className="text-xl font-semibold">User Details</h4>
      </div>
      <UserViewContent />
    </div>
  );
};

export default UserView;
