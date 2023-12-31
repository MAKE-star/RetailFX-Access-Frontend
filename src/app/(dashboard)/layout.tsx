"use client";
import { AdminHeader, TopHeader } from "@/components";
//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import AuthContextProvider, { useAuthContext } from "@/lib/context/AuthContext";
import Avatar from "react-avatar";

const inter = Inter({ subsets: ["latin"] });

/*export const metadata: Metadata = {
  title: "Retail Fx",
  description: "Generated by create next app",
};
*/
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <div className="flex h-screen sticky">
        <div className="w-52	shadow-sm bg-white border-r-2 border-gray-200">
          <AdminHeader />
        </div>
        <div className="w-full col-span-10">
          <TopHeader />
          {children}
        </div>
      </div>
    </AuthContextProvider>
  );
}
