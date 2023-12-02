import CheckBox from "@/ui/CheckBox";
import React from "react";
import { TUserList } from "./type";
import { MenuIcon } from "@/resources";
import { cn } from "@/lib";
import { useRouter } from "next/navigation";

const AdminTable = ({ checked, userData }: TUserList) => {
  const { push } = useRouter();
  const style = "text-gray-800 p-3 text-sm text-start";
  const headStyle = "text-gray-400 text-xs p-3 text-start";
  const userEdit = () => {
    push("users/edit/10");
  };
  const viewUser = () => {
    push("/users/10");
  };

  return (
    <table className="table-auto w-full ">
      <thead>
        <tr>
          <th className={headStyle}>
            <CheckBox checked={checked} />
          </th>
          <th className={headStyle}>#ID</th>
          <th className={headStyle}>FULLNAME</th>
          <th className={headStyle}>EMAIL ADDRESS</th>
          <th className={headStyle}>TYPE</th>
          <th className={headStyle}>INACTIVE</th>
          <th className={headStyle}>CREATED AT</th>
          <th className={headStyle}></th>
        </tr>
      </thead>
      <tbody>
        {userData?.map((user: any, index: any) => {
          return (
            <tr
              key={user.id}
              className={cn(
                index % 2 == 0
                  ? "bg-white cursor-pointer"
                  : "bg-gray-50 cursor-pointer"
              )}
            >
              <td className={style}>
                <CheckBox checked={checked} />
              </td>
              <td className={style}>{user.id}</td>
              <td className={style} onClick={userEdit}>
                {user.name}
              </td>
              <td className={style} onClick={viewUser}>
                {user.email}
              </td>
              <td className={style}>{user.type}</td>
              <td className={style}>{user.active}</td>
              <td className={style}>{user.created_at}</td>
              <td className={style}>
                <MenuIcon className="text-gray-600" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminTable;
