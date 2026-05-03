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
      <div className="flex items-center gap-2 md:gap-3">
        <div
          className={`md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center ${lineColor} bg-opacity-10`}
        >
          <Icon icon={icon} color={color} className="md:h-6 md:w-6" />
        </div>
        <p className="text-gray-600 text-[11px] md:text-sm font-medium">
          {name}
        </p>
      </div>

      <div className="flex items-end justify-between mt-4">
        <h2 className="md:text-2xl text-sm font-bold">${value}</h2>
        <div className="w-16 h-[30px] rounded-full flex items-center justify-center bg-opacity-10">
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

function ActionCards({ title, imageSrc, icon, href }) {
  return (
    <div className="border h-80 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white overflow-hidden p-4">
      <div className="w-full h-56 overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <Icon icon={icon} width={28} height={28} />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <Link
          href={href}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  const { apiRequest, loading } = useApi();
  const [stat, setStats] = useState(null);

  const handleStatsFetch = async () => {
    try {
      const res = await apiRequest(
        "https://premium-invest-server-0aff.onrender.com/api/user/dashboard-stats",
        "GET"
      );

      if (!res.success) {
        toast.error(res.message || "Failed to fetch stats");
        return;
      }

      // ✅ FIXED
      setStats(res.data);
      console.log("Dashboard stats:", res);

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
      value: loading ? "..." : stat?.balance ?? 0,
      icon: "mdi:receipt-text-outline",
      color: "#2563eb",
      lineColor: "bg-blue-200",
    },
    {
      name: "Total Investment",
      value: loading ? "..." : stat?.totalInvestmentAmount ?? 0,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
    {
      name: "Total Profit",
      value: loading ? "..." : stat?.totalProfitAmount ?? 0,
      icon: "mdi:cash-multiple",
      color: "#16a34a",
      lineColor: "bg-green-200",
    },
    {
      name: "Total Withdrawal",
      value: loading ? "..." : stat?.totalWithdrawalAmount ?? 0,
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
      <h1 className="md:text-3xl text-md font-bold">Dashboard</h1>

      <KycVerifyNotice />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((item, i) => (
          <DashboardStats key={i} {...item} />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ActionCards
          title="Crypto"
          imageSrc={cryptoInvest}
          href="/dashboard/investments/crypto"
          icon="streamline-freehand-color:crypto-currency-bitcoin-chip"
        />
        <ActionCards
          title="Loans"
          imageSrc={loanInvest}
          href="/dashboard/investments/loan"
          icon="carbon:global-loan-and-trial"
        />
        <ActionCards
          title="Real Estate"
          imageSrc={stockInvest}
          href="/dashboard/investments/real-estate"
          icon="material-symbols:real-estate-agent-outline-rounded"
        />
      </div>

      <DashboardServices />
    </motion.div>
  );
}
