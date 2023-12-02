"use client";
import React, { useEffect, useState } from "react";
import { TUserList } from "./types";
import { users } from "@/lib";
import { UserTable } from "@/components/users";
import Pagination from "@/ui/Pagination";
import { useUsersServices } from "@/services";
import { Button } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const UserList = ({}: TUserList) => {
  const [checked, setChecked] = useState(false);
  const { useGetUsers } = useUsersServices();
  const { useDeleteUser } = useUsersServices();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const option: any = {
    position: "top-right", // Position of the toast
    autoClose: 3000, // Auto-close the toast after 5 seconds (set to false to disable)
    hideProgressBar: false, // Display a progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the timer when hovered
    draggable: true, // Make the toast draggable
  };
  const [userData, setUserData] = useState([]);
  const {
    data: usersData,
    isLoading: userIsLoading,
    error: userError,
    refetch: userRefetch,
  } = useGetUsers(page);
  const [open, setOpen] = useState(false);
  const deleteUser = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (usersData) {
      setCount(usersData?.data?.count);
      const data = usersData?.data?.rows?.map((item: any) => {
        return {
          ...item,
          checked: false,
        };
      });
      setUserData(data);
    }
  }, [usersData]);
  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const { mutate: usersDeleteMutate, isLoading: usersDeleteLoading } =
    useDeleteUser();
  const onSubmit = async () => {
    selectedItems?.map((item) => {
      usersDeleteMutate(item, {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
          userRefetch();
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          userRefetch();
        },
      });
    });
  };
  /*const gridOptions = {
    statusBar: {
        statusPanels: [
            {
                statusPanel: 'agTotalAndFilteredRowCountComponent',
                align: 'left',
            }
        ]
    },
}
*/

  return (
    <div> {/*className="container mx-auto" >@mayopo*/}
      <div className="p-8" >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-5">
            <h1 className="font-bold text-lg ">Users</h1>
            <p className="">({count})</p>
            <Button variant="primary" size="sm" href="/users/create">
              <div className=" flex justify-center items-center w-full">
                <i className="bi bi-plus"></i>
                <p className=" font-normal">Add Users</p>
              </div>
            </Button>
            <Button
              size="sm"
              className="border  border-red-500 border-solid bg-gray-50 "
              onClick={onSubmit}
            >
              <div className="flex justify-center items-center w-full gap-3">
                <i className="bi bi-trash-fill text-red-500"></i>
                <p className=" font-normal text-red-500">Delete Selected</p>
              </div>
            </Button>
          </div>
          <Pagination setPage={setPage} currentPage={page} count={count} />
        </div>
        <UserTable
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          userData={userData}
        />
        <DeleteModal
          open={open}
          setOpen={setOpen}
          header={"Delete User"}
          label={"Are you sure want to delete this User?"}
          btnText={"Delete"}
        />
        <ToastContainer />
        {/*<div>
        {gridOptions.statusBar.statusPanels.map((panel, index) => (
          <div key={index}>
            {panel.statusPanel} - {panel.align}
          </div>
        ))}
        </div>*/}
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem" }}>Total Users: {count}</span>
        </div>
      </div>
    </div>
  );
};

export default UserList;
