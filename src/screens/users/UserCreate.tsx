import React from "react";
import { TUserCreate } from "./types";
import { UserCreateContent} from "@/components/users";

const UserCreate = ({}: TUserCreate) => {
  return (
    <div className="max-w-3xl mx-auto p-5">


      <UserCreateContent />
    </div>
  );
};

export default UserCreate;
