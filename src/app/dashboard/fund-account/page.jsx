"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import { Icon } from "@iconify/react";
import MiniLineChart from "@/components/ui/MiniLineChart";
import TableComponent from "@/components/TableComponents";
import FundAccountForm from "@/components/FundAccountForm";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";





function DashboardStats({ name, value, icon, color, lineColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-md md:rounded-2xl shadow-sm w-full border border-gray-300 p-3 md:p-5 flex flex-col justify-between hover:shadow-md transition-all"
    >
      {/* Top section */}
      <div className="flex items-center gap-1 md:gap-3">
        <div
          className={`md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center ${lineColor} bg-opacity-10`}
        >
          <Icon icon={icon} color={color} className="md:h-6 md:w-6" />
        </div>
        <p className="text-gray-600 text-[11px] md:text-2xl font-medium">
          {name}
        </p>
      </div>

      {/* Bottom section */}
      <div className="flex items-end justify-between md:mt-6">
        <h2 className="md:text-2xl text-sm font-bold">${value}</h2>
        <div
          className={`w-16 h-[30px] rounded-full flex items-center justify-center  bg-opacity-10`}
        >
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

const page = () => {
  const{loading, apiRequest} = useApi();
  const [stat, setStats] = useState();
  const pulse = 0;
  const handleStatsFetch = async () => {
    try {
      const res = await apiRequest("/api/users/me/dashboard", "GET");
      if (!res.success) {
        toast.error(res.message || "Error in fetching your stats");
      }
      setStats(res?.data.data);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleStatsFetch();
  }, []); 


   const columns = [
  { label: "Amount", icon: "mdi:currency-usd" },
  { label: "Date", icon: "mdi:calendar-month" },
  { label: "Type", icon: "mdi:swap-horizontal" },
  { label: "Status", icon: "mdi:check-circle-outline" },
];


const data = [
  {
    Amount: "$250",
    Date: "2025-11-01",
    Type: "Deposit",
    Status: "Successful",
  },
  {
    Amount: "$120",
    Date: "2025-10-28",
    Type: "Withdrawal",
    Status: "Pending",
  },
  {
    Amount: "$500",
    Date: "2025-10-22",
    Type: "Investment",
    Status: "Successful",
  },
  {
    Amount: "$90",
    Date: "2025-10-15",
    Type: "Referral Bonus",
    Status: "Successful",
  },
  {
    Amount: "$300",
    Date: "2025-10-10",
    Type: "Withdrawal",
    Status: "Failed",
  },
  {
    Amount: "$750",
    Date: "2025-09-30",
    Type: "Deposit",
    Status: "Pending",
  },
];



  const withdrawalStats = [
    {
      name: "Account Deposit",
      value: loading ? pulse : stat?.balance || 0,
      icon: "mdi:receipt-text-outline",
      color: "#2563eb",
      lineColor: "bg-blue-200",
    },
    {
      name: "Total Investment",
      value: loading ? pulse : stat?.totalInvestmentAmount || 0,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <KycVerifyNotice />
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex flex-col w-full gap-3 ">
            <div className="flex gap-2 w-full">
              {withdrawalStats.map((stat, i) => (
                <DashboardStats key={i} {...stat} />
              ))}
            </div>
            <TableComponent title={"Deposit history"} columns={columns} data={data} />
          </div>
          <div className="flex w-full  flex-col gap-4">
            <p className="font-semibold text-2xl">
              Select Cryptocurrency and amount
            </p>
            <FundAccountForm />
          </div>
        </div>
      </motion.h1>
    </div>
  );
};

export default page;
