"use client";

import React, { useState } from "react";

const PlainInputs = ({ label = "Amount", value, onChange, currency = "USD", disabled }) => {
  const [displayValue, setDisplayValue] = useState(
    value ? formatCurrency(value, currency) : ""
  );

  function formatCurrency(val, curr) {
    if (!val && val !== 0) return "";
    const num = parseFloat(val.toString().replace(/[^\d.]/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: curr,
    });
  }

  function handleChange(e) {
    const input = e.target.value;
    setDisplayValue(input);
    const numericValue = input.replace(/[^0-9.]/g, "");
    if (onChange) onChange(numericValue);
  }

  function handleBlur() {
    setDisplayValue(formatCurrency(displayValue, currency));
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
        onBlur={handleBlur}
        placeholder="$0.00"
        className="w-full border border-gray-300 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default PlainInputs;
