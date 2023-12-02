import { useAuthContext } from "@/lib";
import { Button } from "@/ui";
import React from "react";

type Props = {};

const TradesCreateHeader = ({
  productIsLoading,
  tradesId,
  updateStatus,
  status,
}: {
  productIsLoading: any;
  tradesId: any;
  updateStatus?: any;
  status?: any;
}) => {
  const auth: any = useAuthContext();

  const { user } = auth ?? {};
  const { ROLE_ID } = user ?? {};

  return (
    <div className=" flex justify-between items-center w-full">
      <div className=" flex items-center gap-5">
        <Button
          variant="primary"
          href="/trades"
          size= "sm"
          className=" text-sm font-normal"
        >
          <i className="bi bi-chevron-left"></i> Back
        </Button>
      </div>
      <div className=" flex gap-5 items-center">
        {tradesId && (
          <p className=" text-sm font-normal ">
            Status :
            <span className=" text-xs text-gray-400">
              {status == "1"
                ? " Approved"
                : status == "2"
                ? " Rejected"
                : " Pending"}
            </span>
          </p>
        )}

        {tradesId && ROLE_ID != 1 && status == "0" && (
          <>
            <Button
              type="button"
              onClick={() => updateStatus({ status: 2 })}
              variant="dangerOutline"
              size="sm"
              className="font-normal "
            >
              Reject <i className="bi bi-send-x-fill ml-2"></i>
            </Button>
            <Button
              onClick={() => updateStatus({ status: 1 })}
              variant="primaryOutline"
              type="button"
              size="sm"
              className="font-normal "
            >
              Approve <i className="bi bi-check2-all ml-2"></i>
            </Button>
          </>
        )}
        {ROLE_ID != 2 && status != "1" && (
          <Button
            loading={productIsLoading}
            variant="primary"
            size="sm"
            className="font-normal"
          >
            {tradesId ? "Update" : "Save"}{" "}
            <i className="bi bi-arrow-down-square-fill ml-2"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TradesCreateHeader;
