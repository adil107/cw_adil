import React from "react";

const Input = ({ placeholder, onChange, type = "text", name, ...rest }) => {
  return (
    <>
      <label
        className="my-1.5 font-semibold text-slate-700 text-lg"
        style={{ marginTop: "10px" }}
      >
        {placeholder}
      </label>

      <input
        className={
          "rounded w-full px-3 py-2 bg-white border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mt-2"
        }
        fullWidth={true}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        name={name}
        {...rest}
      />
      <br></br>
      <br></br>
    </>
  );
};

export default Input;
