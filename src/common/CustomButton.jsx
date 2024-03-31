import React from "react";
// import { LoadingButton as Button } from "@mui/lab";
const CustomButton = ({
  name,
  onClick,
  loading,
  variant = "contained",
  style = {},
  children,
  ...rest
}) => {
  return (
    <div>
      <button
        className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-[white] shadow-sm  hover:bg-gray-50 hover:ring-1 hover:ring-inset hover:ring-gray-300 hover:text-black sm:mt-0 sm:w-auto"
        loading={loading}
        loadingPosition={"start"}
        variant={variant}
        onClick={onClick}
        fullWidth={true}
        {...rest}
      >
        {children || name}
      </button>
    </div>
  );
};

export default CustomButton;
