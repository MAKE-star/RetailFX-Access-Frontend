import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calPagination(items: any, page: any) {
  const totalItems = items; // Total number of items
  const pageSize = 15; // Number of items per page
  const currentPage = page; // Current page number

  // Calculate the page count
  const pageCount = Math.ceil(totalItems / pageSize);

  // Create the pagination object
  return {
    page: currentPage,
    pageSize: pageSize,
    pageCount: pageCount,
    total: totalItems,
  };
}
