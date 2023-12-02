import React from "react";

const Notification = ({}) => {
  return (
    <div className=" flex gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4">Notification</p>
      <div className=" flex items-center mt-4">
        <input
          type="checkbox"
          className=" h-4 w-4 focus-visible:bg-blue-900"
        />
        <p className=" text-sm pl-4 ">Email</p>
      </div>
    </div>
  );
};

export default Notification;
