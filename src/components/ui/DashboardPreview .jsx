// components/DashboardPreview.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const DashboardPreview = () => {
  return (
    <motion.section
      className="bg-white shadow-lg rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-5xl h-[250px] sm:h-[200px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">Dashboard</h3>
        <button className="text-xs sm:text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded self-start sm:self-auto">
          Verify now
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 border rounded-lg text-center">
          <p className="text-xs sm:text-sm text-gray-500">Account Deposit</p>
          <h4 className="text-lg sm:text-2xl font-bold">$14,098</h4>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg text-center">
          <p className="text-xs sm:text-sm text-gray-500">Total Investment</p>
          <h4 className="text-lg sm:text-2xl font-bold">$33,043</h4>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg text-center">
          <p className="text-xs sm:text-sm text-gray-500">Total Profit</p>
          <h4 className="text-lg sm:text-2xl font-bold">$12,236</h4>
        </div>

        <div className="p-3 sm:p-4 border rounded-lg text-center">
          <p className="text-xs sm:text-sm text-gray-500">Total Withdrawal</p>
          <h4 className="text-lg sm:text-2xl font-bold">$10,000</h4>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardPreview;
