"use client";

import React, { useState, useEffect } from "react";

const PlainInputs = ({
  label = "Amount",
  value,
  onChange,
  disabled,
  reset,
  placeholder
  
}) => {
  const [displayValue, setDisplayValue] = useState(value || "");

  useEffect(() => {
    setDisplayValue("");
  }, [reset]);

  function handleChange(e) {
    const input = e.target.value;
    setDisplayValue(input);
    if (onChange) onChange(input);   // send raw input
  }

  return (
    <div className="w-full">
      <label className="block text-xl pl-2 font-medium text-gray-500 mb-1">
        {label}
      </label>

      <input
        disabled={disabled}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || "Enter amount"}
        className="w-full border border-gray-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PlainInputs;
