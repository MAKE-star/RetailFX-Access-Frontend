"use client";
import { users } from "@/lib";
import React, { useState } from "react";
import { AdminTable } from ".";
import Pagination from "@/ui/Pagination";

const AdminList = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center">
          <h1 className="font-bold text-lg pb-5 ">Users</h1>
          <p className="pb-5 pl-2">{`(${users?.length})`}</p>
        </div>
        {/* <Pagination/> */}
      </div>
      <AdminTable checked={checked} userData={users} />
    </div>
  );
};

export default AdminList;
