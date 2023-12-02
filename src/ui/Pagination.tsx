"use client";
import { calPagination } from "@/lib";
import React, { useEffect, useState } from "react";
import { Button } from ".";

const Pagination = ({
  setPage,
  currentPage,
  count,
}: {
  setPage: any;
  currentPage: any;
  count: any;
}) => {
  const [paginationData, setPaginationData] = useState<any>({});
  useEffect(() => {
    const pagination = calPagination(count, currentPage);
    setPaginationData(pagination);
  }, [currentPage, count]);
  const { page, pageSize, pageCount, total } = paginationData ?? {};
  return (
    <div className="flex items-center justify-end gap-3">
      {/* <p className=" font-normal text-base">15 per page</p> */}
      <div className=" flex gap-3 items-center">
        <Button
          size="sm"
          disabled={currentPage == 1}
          onClick={() => setPage(1)}
          variant="infoGhost"
          className=" text-black hover:bg-white disabled:bg-gray-200"
        >
          <i className="bi bi-chevron-double-left "></i>
        </Button>
        <Button
          size="sm"
          disabled={currentPage == 1}
          onClick={() => setPage(currentPage - 1)}
          variant="infoGhost"
          className=" text-black hover:bg-white disabled:bg-gray-200"
        >
          <i className="bi bi-chevron-left "></i>
        </Button>

        <p className="font-normal text-base">
          {`${page} of ${pageCount} `}{" "}
          <span className=" text-gray-400">({count})</span>
        </p>
        <Button
          size="sm"
          disabled={currentPage == pageCount}
          onClick={() => setPage(currentPage + 1)}
          variant="infoGhost"
          className=" text-black hover:bg-white  disabled:bg-gray-200"
        >
          <i className="bi bi-chevron-right "></i>
        </Button>

        <Button
          size="sm"
          disabled={currentPage == pageCount}
          onClick={() => setPage(pageCount)}
          variant="infoGhost"
          className=" text-black hover:bg-white  disabled:bg-gray-200"
        >
          <i className="bi bi-chevron-double-right "></i>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
