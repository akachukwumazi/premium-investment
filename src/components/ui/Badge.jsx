"use client";
import React from "react";

const Badge = ({ status }) => {
  const badgeStyles = {
    Successful: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full ${
        badgeStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default Badge;
