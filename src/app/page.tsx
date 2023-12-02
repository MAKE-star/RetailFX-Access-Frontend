"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/sign-in");
  }, [push]);

  return <div>Loading...</div>;
};

export default Page;
