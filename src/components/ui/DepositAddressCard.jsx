"use client";
import React, { useState } from "react";
import { Copy } from "lucide-react";

const PaymentDetails = ({
  label = "Deposit address",
  address,
  warning = "Send only the supported coin or token to this address.",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="w-full space-y-2">
      <p className="text-gray-700 font-semibold">Payment Details:</p>

      <div className="flex justify-between items-center border rounded-xl bg-gray-50 px-4 py-3 shadow-sm">
        <div className="flex flex-col w-full">
          <span className="text-gray-400 text-sm">{label}</span>
          <span className="text-gray-700 font-medium break-all text-xl tracking-wider">{address}</span>
        </div>

        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-blue-600 transition"
          title="Copy Address"
        >
          <Copy size={20} />
        </button>
      </div>

      <p className="text-red-600 text-sm">{warning}</p>

      {copied && <p className="text-green-500 text-sm">Copied!</p>}
    </div>
  );
};

export default PaymentDetails;
