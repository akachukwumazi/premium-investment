import React from "react";
import { Icon } from "@iconify/react";
import EmptyServices from "./EmptyServices";
import { useApi } from "@/hooks/useApi";

const user = [
  {
    Profit: 1200,
    TotalProfit: 5000,
    Investment: 10000,
    Plan: "Gold Plan",
    Date: "2025-10-12",
  },
  {
    Profit: 800,
    TotalProfit: 3200,
    Investment: 7500,
    Plan: "Silver Plan",
    Date: "2025-09-28",
  },
  {
    Profit: 2100,
    TotalProfit: 9600,
    Investment: 15000,
    Plan: "Diamond Plan",
    Date: "2025-11-01",
  },
  {
    Profit: 950,
    TotalProfit: 4100,
    Investment: 8000,
    Plan: "Starter Plan",
    Date: "2025-08-19",
  },
  {
    Profit: 1450,
    TotalProfit: 6700,
    Investment: 12500,
    Plan: "Platinum Plan",
    Date: "2025-11-03",
  },
];

const fetchServices = async () => {
  const { apiRequest, error, loading } = useApi();

  try {
    const res = await apiRequest("/api/users/me/dashboard", "GET");

    if (!res.success) {
      toast.error(res.message || "Error in fetching your stats");
    }
  } catch (err) {}
};

const DashboardServices = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-md md:text-2xl text-premium-black">
        Services and Investments
      </h3>

      {/* Scroll container for small screens */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] md:min-w-full">
          {/* Header */}
          <div className="grid grid-cols-5 w-full p-4 bg-purple-100 rounded-md">
            <div className="flex gap-1 items-center justify-center">
              <p className="font-semibold text-sm md:text-md">Profit</p>
              <Icon icon="hugeicons:profit" />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-semibold text-sm md:text-md">Total Profit</p>
              <Icon icon="tdesign:money" />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-semibold text-sm md:text-md">Investment</p>
              <Icon icon="streamline:investment-selection" />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-semibold text-sm md:text-md">Plan</p>
              <Icon icon="stash:plan-light" />
            </div>
            <div className="flex gap-1 items-center justify-center">
              <p className="font-semibold text-sm md:text-md">Date</p>
              <Icon icon="stash:data-date-light" />
            </div>
          </div>

          {/* Body */}
          <div className="w-full flex flex-col min-h-[40vh]">
            {user && user.length > 0 ? (
              user.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 w-full p-4 border-b border-gray-200 hover:bg-purple-50 transition-all"
                >
                  <p className="text-center font-medium text-gray-800">
                    ${item.Profit.toLocaleString()}
                  </p>
                  <p className="text-center font-medium text-gray-800">
                    ${item.TotalProfit.toLocaleString()}
                  </p>
                  <p className="text-center font-medium text-gray-800">
                    ${item.Investment.toLocaleString()}
                  </p>
                  <p className="text-center font-medium text-gray-800">
                    {item.Plan}
                  </p>
                  <p className="text-center font-medium text-gray-600">
                    {item.Date}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <EmptyServices />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
