"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import MiniLineChart from "@/components/ui/MiniLineChart";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import Image from "next/image";
import Link from "next/link";
import DashboardServices from "@/components/DashboardServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cryptoInvest = "/bitcoin_investment_dashboard.jpg";
const loanInvest = "/loan_investment_dashboard.jpg";
const stockInvest = "/stocks_investment_dashboard.jpg";
const realEstate = "/real_estate_dashboard.jpg";

function DashboardStats({ name, value, icon, color, lineColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-md md:rounded-2xl shadow-sm border border-gray-300 p-3 md:p-5 flex flex-col justify-between hover:shadow-md transition-all"
    >
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

      <div className="flex items-end justify-between md:mt-6">
        <h2 className="md:text-2xl text-sm font-bold flex items-center gap-2">${value}</h2>
        <div
          className={`w-16 h-[30px] rounded-full flex items-center justify-center  bg-opacity-10`}
        >
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

function ActionCards({ title, imageSrc, onClick, icon, href }) {
  return (
    <div
      className="border h-80 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden w-full  cursor-pointer p-4"
      onClick={onClick}
    >
      <div className="w-full h-57 overflow-hidden rounded-t-2xl">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center px-2 md:px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon icon={icon} width={28} height={28} />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <Link
          href={href}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}


export default function Page() {
  const [stat, setStats] = useState();
  const { apiRequest, loading, error } = useApi();

  // const pulse = <div className="w-15 h-3 animate-pulse bg-gray-300 rounded"></div>;
  const pulse = 0;

  const handleStatsFetch = async () => {
    try {
      const res = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/user/dashboard-stats", "GET");

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

  const stats = [
    {
      name: "Account Deposit",
      value: loading ? pulse : stat?.balance || 0,
      icon: "mdi:receipt-text-outline",
      color: "#2563eb",
      lineColor: "bg-blue-200",
    },
    {
      name: "Total Investment",
      value:  loading ? pulse : stat?.totalInvestmentAmount || 0 ,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
    {
      name: "Total Profit",
      value: loading ? pulse : stat?.totalProfitAmount || 0,
      icon: "mdi:cash-multiple",
      color: "#16a34a",
      lineColor: "bg-green-200",
    },
    {
      name: "Total Withdrawal",
      value: loading ? pulse : stat?.totalWithdrawalAmount || 0,
      icon: "mdi:bank-transfer-out",
      color: "#9333ea",
      lineColor: "bg-purple-200",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-6"
    >
      <h1 className="md:text-3xl text-md font-bold mb-6">Dashboard</h1>
      <KycVerifyNotice isVerified={false} />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {stats.map((stat, i) => (
          <DashboardStats key={i} {...stat} />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <ActionCards
          title="Crypto"
          imageSrc={cryptoInvest}
          href={"/dashboard/investments/crypto"}
          onClick={() => console.log("Make Deposit clicked")}
          icon={"streamline-freehand-color:crypto-currency-bitcoin-chip"}
        />
        <ActionCards
          title="Loans"
          imageSrc={loanInvest}
          href={"/dashboard/investments/loan"}
          onClick={() => console.log("Make Deposit clicked")}
          icon={"carbon:global-loan-and-trial"}
        />
        <ActionCards
          title="Real Estate"
          imageSrc={stockInvest}
          href={"/dashboard/investments/real-estate"}
          onClick={() => console.log("Make Deposit clicked")}
          icon={"material-symbols:real-estate-agent-outline-rounded"}
        />
        <ActionCards
          title="Stocks & Bonds"
          imageSrc={realEstate}
          href={"/dashboard/investments/stocks"}
          onClick={() => console.log("Make Deposit clicked")}
          icon={"arcticons:stockswidget"}
        />
      </div>
      <div>
        <DashboardServices />
      </div>
    </motion.div>
  );
}
