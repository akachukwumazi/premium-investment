"use client";
import React, { useState } from "react";

const CustomSelect = ({ options, selected, onChange, label }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {label && (
        <label className="text-gray-500 font-semibold text-xl">{label}</label>
      )}

      <div
        className="flex justify-between px-3 py-4 border rounded-md border-gray-300 cursor-pointer relative"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex gap-2 items-center">
          {selected.icon}
          <p className="font-semibold text-xl">{selected.name}</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        {open && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
            {options.map((opt) => (
              <div
                key={opt.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(opt);
                }}
                className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                  selected.name === opt.name ? "bg-gray-300" : "bg-white"
                }`}
              >
                {opt.icon}
                <span className="font-semibold">{opt.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
