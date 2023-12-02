"use client";
import React, { useEffect, useState } from "react";
import { TNavigation } from "./type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/lib/context/AuthContext";

const otherNavigation: TNavigation[] = [
  {
    label: "Users",
    href: "/users",
  },
  {
    label: "Trades",
    href: "/trades",
  },
];
const Header = () => {
  const pathName = usePathname();
  const auth: any = useAuthContext();
  const { user } = auth ?? {};
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    const nav: any = otherNavigation;
    setNavigation(nav);
  }, [user]);

  return (
    <div className=" flex gap-10">
      <Link href="/dashboard" className=" py-5 px-5 font-semibold">
        RETAIL FX
      </Link>
      {navigation?.map((item: any, index: number) => {
        return (
          <Link
            key={index}
            className={`py-5 ${
              pathName == item.href
                ? " border-b-4 border-blue-900 font-semibold"
                : " text-gray-500 font-normal"
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Header;
