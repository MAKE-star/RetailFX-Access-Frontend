"use client";
import React, { useEffect, useState } from "react";
import { TNavigation } from "./type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";
import { signOut } from "next-auth/react";

const adminNavigation: TNavigation[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <i className="bi bi-grid-3x3-gap text-md"></i>,
  },
 
  {
    label: "Products",
    href: "/products",
    icon: <i className="bi bi-book text-sm"></i>,
  },

  {
    label: "Rates",
    href: "/rate-table",
    icon: <i className="bi bi-cash text-sm"></i>,
  },
  {
    label: "Settle Accounts",
    href: "/branchsettles",
    icon: <i className="bi bi-bank text-sm"></i>
  },
  {
    label: "Users",
    href: "/users",
    icon: <i className="bi bi-people text-sm"></i>,
  },
];
const makerNavigation: TNavigation[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <i className="bi bi-grid-3x3-gap text-sm"></i>,
  },
  {
    label: "Trades",
    href: "/trades",
    icon: <i className="bi bi-stickies text-sm"></i>,
  },
 
];
const checkerNavigation: TNavigation[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <i className="bi bi-grid-3x3-gap text-sm"></i>,
  },
  {
    label: "Trades",
    href: "/trades",
    icon: <i className="bi bi-stickies text-sm"></i>,
  },
];

const AdminHeader = () => {
  const pathName = usePathname();
  const auth: any = useAuthContext();
  const {push}=useRouter();
  const { user } = auth ?? {};
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    const nav: any =
      user?.ROLE_ID == 0
        ? adminNavigation
        : user?.ROLE_ID == 1
        ? makerNavigation
        : checkerNavigation;

    setNavigation(nav);
  }, [user]);

  const adminStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#010028",
    height: "100%", 
    position: "fixed", 
    top: 0,
    left: 0,
    width: "11.7rem",
  }as React.CSSProperties;
  

  return (
    <div className=" flex flex-col gap-2 px-2" style={adminStyle}>
      <Link href="/dashboard" className=" py-5 px-5 text-white font-semibold">
      RETAIL FX
      </Link>
      {navigation?.map((item: any, index: number) => {
        return (
          <Link
            key={index}
            className={`py-2 ${
             pathName == item.href
                ? " border-l-4 border-blue-900 bg-gray-100 font-semibold rounded hover:bg-blue-900"
                : " text-white font-normal"
            }`}
            href={item.href}
          >
            <div className="flex  px-2 items-center gap-3">
              {item.icon}
              {item.label}
            </div>
          </Link>
        );
      })}
      <button
        className={"p-2  bg-transparent text-white"}
        onClick={() => {signOut({redirect:false});push('/sign-in')}}
      >
        <div className="flex items-center gap-2">
          <i className="bi bi-arrow-left-square w-5 h-5"></i>
          Logout
        </div>
      </button>
    </div>
  );
};

export default AdminHeader;
