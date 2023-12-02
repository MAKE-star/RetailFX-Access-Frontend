import React from "react";

type Props = {};

const ProductsCreateSpot = ({
  spot,
  setSpot,setFormA,formA
}: {
  spot: boolean;
  setSpot: any;
  setFormA: any;
  formA: boolean;
}) => {
  return (
    <>
    <div className=" grid grid-cols-5 gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4 col-span-1">Spot</p>
      <div className=" col-span-4 flex items-center mt-4">
        <input
          type="checkbox"
          className=" h-4 w-4 focus-visible:bg-blue-900"
          checked={spot}
          onChange={(e: any) => setSpot(e?.target?.checked)}
        />
        <p className=" text-sm pl-4 ">Enable</p>
      </div>
    </div>
    {/* <div className=" grid grid-cols-5 gap-10 border-b-2 border-gray-200 pb-6">
      <p className=" text-base mt-4 col-span-1">Show Form A</p>
      <div className=" col-span-4 flex items-center mt-4">
        <input
          type="checkbox"
          className=" h-4 w-4 focus-visible:bg-blue-900"
          checked={formA}
          onChange={(e: any) => setFormA(e?.target?.checked)}
        />
        <p className=" text-sm pl-4 ">Show</p>
      </div>
    </div> */}
    </>
  );
};

export default ProductsCreateSpot;
