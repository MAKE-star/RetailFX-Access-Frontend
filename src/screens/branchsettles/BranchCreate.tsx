import React from "react";
import { TBranchCreate } from "./types";
import { BranchCreateContent } from "@/components/branchsettles";

const BranchCreate = ({}: TBranchCreate) => {
  return (
    <div className="max-w-3xl mx-auto p-5">
      <BranchCreateContent/>
    </div>
  );
};

export default BranchCreate;
