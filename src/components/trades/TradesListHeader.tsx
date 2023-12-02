"use client";
import { statusOptions, useAuthContext } from "@/lib";
import { GET_PRODUCTS } from "@/services/products/constants";
import productService from "@/services/products/products";
import { TradeFilterQuery } from "@/services/trade/trade";
import { Button, FormSelect } from "@/ui";
import Pagination from "@/ui/Pagination";
import React ,{useState} from "react";
import ReactDatePicker from "react-datepicker";
import { useQuery } from "react-query";
import Select from "react-select";
import moment from "moment";

type Props = {};

const TradesListHeader = ({
  count,
  selectedItems,
  setPage,
  page,
  setFilters,
  filters,
}: {
  count: number;
  selectedItems: any;
  setPage: any;
  page: any;
  setFilters: React.Dispatch<React.SetStateAction<TradeFilterQuery>>;
  filters: TradeFilterQuery;
}) => {
  const auth: any = useAuthContext();
  const { data: productsResponse } = useQuery([GET_PRODUCTS], () =>
    productService.getProducts()
  );

  if (typeof filters.status === "undefined") {
    filters.status = 0; 
  };

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(
    statusOptions.find((opt: any) => opt.value === "0")
  );

  const { user } = auth ?? {};
  const { ROLE_ID } = user ?? {};

  return (
    <div>
      <div className="flex justify-between items-center w-full gap-2">
        <div className="flex items-center gap-5">
          <p className=" text-base font-semibold">
            Trades <span className=" font-normal text-gray-600">({count})</span>
          </p>
          {ROLE_ID != 2 && (
            <Button variant="primary" size="sm" href="/trades/create">
              <div className=" flex justify-center items-center w-full">
                <i className="bi bi-plus mr-2"></i>
                <p className=" font-normal">Add Trades</p>
              </div>
            </Button>
          )}
        </div>
        <div className="flex-1">
          <div className="  flex  gap-2 items-center justify-end">
            <div className=" col-span-8">
              <Pagination setPage={setPage} currentPage={page} count={count} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 mt-4">
        <div className="flex gap-5">
          <div className="flex gap-5 items-center mt-4">
            <div>Filters</div>

            <Button
              variant="primaryLink"
              size="sm"
              onClick={() => setFilters({})}
            >
              Clear
            </Button>
          </div>

          <div className="flex flex-1 flex-wrap gap-2">
            <div>
              <div className="text-sm ">Search by TradeID or Account No</div>
              <input
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                value={filters.search || ""}
                type="text"
                className="text-sm bg-zinc-100 focus:border-blue-900 border-b-2 border-transparent disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white rounded focus-visible:outline-none w-full px-2 py-1.5"
                placeholder="Enter Trade Id"
              />
            </div>

            <div>
              <div className="text-sm">Status</div>
              <Select
                className="w-[170px] text-sm py- 0.1"
                /*
                value={
                  typeof filters.status !== "undefined"
                    ? statusOptions.find(
                        (opt: any) => opt.value === filters.status
                      )
                    : null
                }
                onChange={(newValue: any) =>
                  setFilters(
                    (prev: TradeFilterQuery) =>
                      ({
                        ...prev,
                        status: newValue ? Number(newValue.value) : undefined,
                      } as TradeFilterQuery)
                  )
                }*/
                value={selectedStatus}
                onChange={(newValue: any) => {
                  setSelectedStatus(newValue);
                  setFilters(
                    (prev: TradeFilterQuery) =>
                      ({
                        ...prev,
                        status: newValue ? Number(newValue.value) : undefined,
                      } as TradeFilterQuery)
                  )
                }}
                options={statusOptions}
                isClearable
              />
            </div>

            <div>
              <div className="text-sm">Trade Date</div>
              <ReactDatePicker
                selected={
                  filters.tradeDate
                    ? moment(filters.tradeDate, "YYYY-MM-DD").toDate()
                    : null
                }
                name="trade_date"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
                className="bg-zinc-100 focus:border-blue-900 border-b-2 border-transparent disabled:cursor-not-allowed disabled:bg-zinc-300 focus:bg-white rounded focus-visible:outline-none w-full px-2 py-1.5"
                onChange={(date: any) =>
                  setFilters((prev) => ({
                    ...prev,
                    tradeDate: moment(date).format("YYYY-MM-DD"),
                  }))
                }
              />
            </div>

            <div>
              <div className="text-sm">Product</div>
              <Select
                className="min-w-[400px]"
                value={selectedProduct}
                onChange={(newValue: any) => {
                  setSelectedProduct(newValue);
                  setFilters((prev: TradeFilterQuery) => ({
                    ...prev,
                    productId: newValue ? newValue.value : undefined,
                  }));
                }}
              /*  value={
                  typeof filters.productId == "undefined"
                    ? productsResponse?.data?.rows.find(
                        (opt: any) => opt.value === filters.productId
                      )
                    : null
                }
                onChange={(newValue: any) =>
                  setFilters(
                    (prev: TradeFilterQuery) =>
                      ({
                        ...prev,
                        productId: newValue ? newValue.value : undefined,
                      } as TradeFilterQuery)
                  )
                }*/
                options={
                  productsResponse?.data?.rows.map((p: any) => ({
                    label: p.PRODUCT_NAME,
                    value: p.PRODUCT_ID,
                  })) || []
                }
                isClearable
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesListHeader;
