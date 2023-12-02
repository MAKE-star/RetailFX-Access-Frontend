"use client";
import React from "react";
import { TBranchEdit } from "./types";

import  BranchEditContent  from "@/components/branchsettles/BranchEditContent";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";

const BranchEdit = ({}: TBranchEdit) => {
  const { push } = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="flex items-center justify-between">
       
      </div>

      <BranchEditContent/>
    </div>
  );
};

export default BranchEdit;
