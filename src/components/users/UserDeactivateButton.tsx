"use client";
import { AccountDeactivateIcon, AccountDeleteIcon } from "@/resources";
import DeleteModal from "@/ui/DeleteModal";
import React, { useState } from "react";

const UserDeactivateButton = ({
  onDelete,
  onDeactivate,
  status,
}: {
  onDelete?: any;
  onDeactivate?: any;
  status?: any;
}) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const deactiveAccount = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    setOpenModal(true);
  };
  return (
    <div className="flex items-start gap-5 pt-8">
      <div
        className={`border-2 ${
          status == "1" ? "border-red-500" : "border-green-500"
        }  px-2 py-1 flex items-center gap-3`}
      >
        <AccountDeactivateIcon
          className={status == "1" ? "text-red-500" : "text-green-500"}
        />
        <button
          type="button"
          className={status == "1" ? "text-red-500" : "text-green-500"}
          onClick={deactiveAccount}
        >
          {status == "1" ? "Deactivate account" : "Activate account"}
        </button>
      </div>
      <div className="border-2 border-red-500 px-2 py-1 flex items-center gap-3">
        <AccountDeleteIcon className="text-red-500" />
        <button
          type="button"
          className="text-red-500 font-md"
          onClick={deleteAccount}
        >
          Delete account
        </button>
      </div>

      <DeleteModal
        open={open}
        setOpen={setOpen}
        header={"Deactivate account"}
        label={"Are you sure want to Deactivate this account?"}
        btnText={"Deactivate"}
        onDelete={onDeactivate}
      />

      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        header={"Delete account"}
        label={"Are you sure want to delete?"}
        btnText={"Delete"}
        onDelete={onDelete}
      />
    </div>
  );
};

export default UserDeactivateButton;
