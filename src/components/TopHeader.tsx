import { useAuthContext } from "@/lib";
import Link from "next/link";
import React from "react";
import Avatar from "react-avatar";

const TopHeader = () => {
  const auth: any = useAuthContext();
  const { user } = auth ?? {};
  const userName = `${user?.FIRST_NAME} ${user?.LAST_NAME}`;
  const nameParts = userName.split(" ");
  const firstName = nameParts[0].charAt(0).toUpperCase();
  const lastName = nameParts[1].charAt(0).toUpperCase();
  return (
    <div className=" px-12 py-2 flex justify-end bg-blue-300 items-center shadow-sm border-b-2 border-gray-200">
      <Link href="/profile" className=" flex gap-3 items-center capitalize">
        <p className=" text-sm  font-normal text-gray-800">
          {`${userName}`}
        </p>
        <div className=" w-8 h-8 bg-blue-900 text-sm  flex justify-center items-center  rounded-3xl text-white">
          {`${firstName}${lastName}`}
        </div>
      </Link>
    </div>
  );
};

export default TopHeader;
