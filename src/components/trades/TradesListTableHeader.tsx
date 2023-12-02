import { TradesTableHeader } from "@/lib";
import { ButtonFilterIcon } from "@/resources";
import React, { useState } from "react";

type Props = {};

const TradesListTableHeader = (props: Props) => {
  /*const [isModalOpen, setIsModalOpen] = useState(false);

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };
*/
  return (
    <tr>
      {TradesTableHeader?.map((item: any, index: number) => {
        let headerContent = item.title;

        if (item.id === 1 || item.id === 2 || item.id === 3 || item.id === 7 || item.id === 8) {
          headerContent = (
            <>
              {item.title}
              <i className="bi bi-funnel" /*onClick={openModal}*/></i>
            </>
          );
        }
        return (
          <th
            key={index}
            scope="col"
            className="text-xs font-bold text-black-500 p-1 uppercase text-left"
          >
            {headerContent}
          </th>
        );
      })}
    </tr>
  );
};

export default TradesListTableHeader;
