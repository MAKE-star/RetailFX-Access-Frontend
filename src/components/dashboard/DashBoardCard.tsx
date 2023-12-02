import {
  BoxRightArrow,
  ProductIcon,
  TicketIcon,
  UserIcon,
} from "@/resources/svg";
import React from "react";
type TQuickLinkCard = {
  label: string;
  name: string;
};
const DashBoardCard = () => {
  const QuickLinkCard = ({ label, name }: TQuickLinkCard) => {
    return (
      <div className="shadow p-5">
        <div className="flex items-center justify-around gap-10">
          <div className="flex items-center gap-5">
            {name == "Users" ? (
              <UserIcon className="text-blue-900 w-8 h-8" />
            ) : name == "Tickets" ? (
              <TicketIcon className="text-blue-900 w-8 h-8" />
            ) : (
              <ProductIcon className="text-blue-900 w-8 h-8" />
            )}
            <div>
              <h4 className="text-md font-semibold">{label}</h4>
              <p className="text-sm  text-gray-400">{name}</p>
            </div>
          </div>
          <BoxRightArrow className="text-gray-500 w-6 h-6" />
        </div>
      </div>
    );
  };

  return (
    <div className="pt-8">
      <h4 className="text-xl font-bold">Quick Link</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pt-8">
        <QuickLinkCard label={"Recently created"} name={"Users"} />
        <QuickLinkCard label={"Makers"} name={"Users"} />
        <QuickLinkCard label={"Checkers"} name={"Users"} />
        <QuickLinkCard label={"Recently added"} name={"Tickets"} />
        <QuickLinkCard label={"Recently updated"} name={"Tickets"} />
        <QuickLinkCard label={"Recently added"} name={"Products"} />
        <QuickLinkCard label={"Recently updated"} name={"Products"} />
      </div>
    </div>
  );
};

export default DashBoardCard;
