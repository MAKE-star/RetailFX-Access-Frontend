"use client";
import React from "react";
import { TUserEdit } from "./types";

import { UserEditContent } from "@/components/users";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";

const UserEdit = ({}: TUserEdit) => {
  const { push } = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="flex items-center justify-between">
       
      </div>

      <UserEditContent />
    </div>
  );
};

export default UserEdit;
