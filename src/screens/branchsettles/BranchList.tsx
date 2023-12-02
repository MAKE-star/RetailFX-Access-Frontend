"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/ui/Pagination";
import { TBranchList } from "./types";
import { Button } from "@/ui";
import {useBranchServices} from "@/services";
import { BranchTable } from "@/components/branchsettles";
import DeleteModal from "@/ui/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

const BranchList = ({}: TBranchList) => {
  const { useGetBranchSettles } = useBranchServices();
  const { useDeleteBranchSettle } = useBranchServices();
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [count, setCount] = useState(1);


  const option: any = {
    position: "top-right", // Position of the toast
    autoClose: 3000, // Auto-close the toast after 5 seconds (set to false to disable)
    hideProgressBar: false, // Display a progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the timer when hovered
    draggable: true, // Make the toast draggable
  };
  
  const [branchSettle, setBranchSettle] = useState([]);

  const {
    data: branchData,
    isLoading: branchIsLoading,
    error: branchError,
    refetch: branchRefetch,
  } = useGetBranchSettles(page);

  const [open, setOpen] = useState(false);
  const deleteBranch = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (branchData) {
      setCount(branchData?.data?.count);
      const data = branchData?.data?.rows?.map((item: any) => {
        return {
          ...item,
          checked: false,
        };
      });
      setBranchSettle(data);
    }
  }, [branchData]);
  const notify = (message: any, tag: any) => {
    tag == "err"
      ? toast.error(message, option)
      : toast.success(message, option);
  };
  const { mutate: branchDeleteMutate, isLoading: branchDeleteLoading } =
    useDeleteBranchSettle();
  const onSubmit = async () => {
    selectedItems?.map((item) => {
      branchDeleteMutate(item, {
        onError(error: any) {
          notify(error?.response?.data?.message, "err");
          branchRefetch();
        },
        onSuccess(data) {
          notify(data?.data?.message, "success");
          branchRefetch();
        },
      });
    });
  };
  return (
    <div> {/*className="container mx-auto" >@mayopo*/}
      <div className="p-8" >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-5">
            <h1 className="font-bold text-lg ">Settlement</h1>
            <p className="">({count})</p>
            <Button variant="primary" size="sm" href="/branchsettles/create">
              <div className=" flex justify-center items-center w-full">
                <i className="bi bi-plus"></i>
                <p className=" font-normal">Add Settlement</p>
              </div>
            </Button>
            <Button
              size="sm"
              className="border  border-red-500 border-solid bg-gray-50 "
              onClick={deleteBranch}
            >
              <div className="flex justify-center items-center w-full gap-3">
                <i className="bi bi-trash-fill text-red-500"></i>
                <p className=" font-normal text-red-500">Delete Selected</p>
              </div>
            </Button>
          </div>
          <Pagination setPage={setPage} currentPage={page} count={count} />
        </div>
        <BranchTable
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          branchSettle={branchSettle}
        />
        <DeleteModal
          open={open}
          setOpen={setOpen}
          onDelete={onSubmit}
          header={"Delete User"}
          label={"Are you sure want to delete this Branch Settlement?"}
          btnText={"Delete"}
        />
        <ToastContainer />
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%"}}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem" }}>Total Settlements: {count} </span>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
