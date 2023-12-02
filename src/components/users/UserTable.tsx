"use client";
import { cn } from "@/lib";
import CheckBox from "@/ui/CheckBox";
import React, { useEffect, useState } from "react";
import { TUser } from "./types";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { Button } from "@/ui";

const UserTable = ({ selectedItems, userData, setSelectedItems }: TUser) => {
  const { push } = useRouter();
  const [usersData, setusersData] = useState(userData);
  const checkData = (event: any, item: any) => {
    const newSelectedItems = selectedItems;
    if (event.target.checked) {
      const newusersData = usersData?.map((data: any) => {
        if (data?.ID == item.ID) {
          return {
            ...data,
            checked: true,
          };
        } else return data;
      });
      !!selectedItems?.length
        ? selectedItems?.map((data: any) => {
            if (data != item.ID) {
              newSelectedItems.push(item.ID);
            }
          })
        : newSelectedItems.push(item.ID);
      setSelectedItems(newSelectedItems);
      setusersData(newusersData);
    } else {
      const newusersData = usersData?.map((data: any) => {
        if (data?.ID == item.ID) {
          return {
            ...data,
            checked: false,
          };
        } else return data;
      });
      const newArray = selectedItems?.filter((data: any) => data != item.ID);
      setSelectedItems(newArray);
      setusersData(newusersData);
    }
  };
  useEffect(() => {
    setusersData(userData);
  }, [userData]);

  const style = "text-gray-800 p-1 text-sm text-start";
  const headStyle = "text-black-400 text-xs font-bold p-1 text-start";
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className={headStyle}>USERNAME</th>
          <th className={headStyle}>FULLNAME</th>
          <th className={headStyle}>EMAIL ADDRESS</th>
          <th className={headStyle}>TYPE</th>
          <th className={headStyle}>STATUS</th>
          <th className={headStyle}>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {usersData?.map((user: any, index: any) => {
          return (
            <tr
              key={user.ID}
              className={cn(
                index % 2 == 0 ? "bg-white cursor-pointer" : "bg-gray-50"
              )}
            >
              <td
                scope="col"
                className="text-sm font-normal text-gray-600 p-1 text-left"
              >
                <div className=" flex items-center gap-5">
                  <CheckBox
                    checked={user?.checked}
                    onChange={(e: any) => checkData(e, user)}
                  />
                  {user?.USERNAME}
                </div>
              </td>
              <td
                className={style}
              >{`${user.FIRST_NAME} ${user.LAST_NAME}`}</td>
              <td className={style}>{user.EMAIL_ID}</td>
              <td className={style}>
                {user.ROLE_ID == "0"
                  ? "Admin"
                  : user.ROLE_ID == "1"
                  ? "Maker"
                  : "Checker"}
              </td>
              <td className={style}>
                {user.IS_ACTIVE == "1" ? "Active" : "In Active"}
              </td>
              <td>
                <Button
                  variant="infoLink"
                  href={`/users/edit/${user?.ID}`}
                  className="flex gap-3 text-sm text-black font-normal text-center"
                >
                  Edit
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
