import React from "react";

function UploadColumnInput({
  handleChange,
  value,
  placeholder,
  id,
  type,
  label,
}) {
  return (
    <>
      <label htmlFor="title">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        onChange={handleChange}
      />
    </>
  );
}

export default UploadColumnInput;
