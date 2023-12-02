import React from "react";
type TPreviousIcon = {
  className: string;
};
const PreviousIcon = ({ className }: TPreviousIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};

export default PreviousIcon;
