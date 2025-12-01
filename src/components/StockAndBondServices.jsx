"use client";
import React, { useEffect, useState } from "react";
import EmptyServices from "./EmptyServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const StockAndBondServices = ({ reload }) => {
  const { apiRequest } = useApi();
  const [stockAnalysis, setStockAnalysis] = useState([]);

  const fetchStockAnalysis = async () => {
    try {
      const res = await apiRequest(
        "/api/users/me/investments/stock-bond/analytics",
        "GET"
      );

      if (!res.success) {
        toast.error(res.message || "Error fetching stock analysis");
        return;
      }
      const data = Array.isArray(res.data) ? res.data : [res.data];

      setStockAnalysis(data);
      console.log("Stock Analysis:", data);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    fetchStockAnalysis();
  }, [reload]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-md md:text-2xl text-premium-black">
        Stocks and Bonds Portfolio Table
      </h3>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] md:min-w-full">
          <div className="grid grid-cols-7 w-full p-4 bg-purple-100 rounded-md">
            {[
              "Asset Name",
              "Type",
              "Units Held",
              "Current Price",
              "Change%",
              "Value",
              "Action",
            ].map((title, i) => (
              <div key={i} className="flex gap-1 items-center justify-center">
                <p className="font-semibold text-sm md:text-md">{title}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col min-h-[40vh]">
            {stockAnalysis.length > 0 ? (
              stockAnalysis.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 w-full p-4 border-b border-gray-200 hover:bg-purple-50 transition-all"
                >
                  <p className="text-center font-medium text-gray-800">
                    {item.plan?.title}
                  </p>

                  <p className="text-center font-medium text-gray-800">
                    {item.plan?.type?.toUpperCase()}
                  </p>

                  <p className="text-center font-medium text-gray-800">
                    {item.unitsHeld}
                  </p>

                  <p className="text-center font-medium text-gray-800">
                    ${item.plan?.currentPrice?.toLocaleString()}
                  </p>

                  <p className="text-center font-medium text-gray-800">
                    {item.plan?.changePercent}%
                  </p>

                  <p className="text-center font-medium text-gray-800">
                    ${item.amount?.toLocaleString()}
                  </p>

                  <p className="text-center font-medium text-purple-600 cursor-pointer">
                    View
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <EmptyServices description="You haven’t added any assets yet." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAndBondServices;
