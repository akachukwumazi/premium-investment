"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import DashBoardStats from "@/components/ui/DashBoardStats";
import ActionCard from "@/components/ui/ActionCard";
const cryptoInvest = "/bitcoin_investment_dashboard.jpg";
import TrendingMarket from "@/components/TrendingMarket";
import PlanCard from "@/components/ui/PlanCard";
import { Icon } from "@iconify/react";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const PlanSkeleton = () => (
  <div className="animate-pulse border border-gray-400 rounded-2xl p-6 h-48 w-full bg-gray-100">
    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
);

function ActionCards({ title, imageSrc, onClick, icon, href }) {
  return (
    <div
      className="border h-80 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden w-full cursor-pointer p-4"
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

const page = () => {
  const [stat, setStats] = useState();
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [startingPlan, setStartingPlan] = useState(false);
  const { apiRequest, loading } = useApi();

  const handleStatsFetch = async () => {
    try {
      const res = await apiRequest("/api/users/me/dashboard", "GET");
      if (!res.success)
        toast.error(res.message || "Error in fetching your stats");
      setStats(res?.data.data);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleStatsFetch();
  }, []);

  const handleFetchPlans = async () => {
    try {
      const res = await apiRequest("/api/investments/crypto/plans", "GET");
      if (!res.success) {
        toast.error(res.message || "Unable to load plans");
        return;
      }
      const normalizedPlans = Array.isArray(res.data)
        ? res.data
        : res.data?.plans
        ? res.data.plans
        : [res.data];
      setPlans(normalizedPlans);
    } catch (err) {
      toast.error("Network error");
      setPlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPlans();
  }, []);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setAmount("");
    setModalOpen(true);
  };

  const handleStartPlan = async () => {

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    
    if (amount < selectedPlan.minDeposit) {
      toast.error("Amount can't be less than min deposit");
      return;
    }
    try {
      setStartingPlan(true);
      const planId = selectedPlan._id;

      const res = await apiRequest(`https://premium-invest-server-0aff.onrender.com/api/users/me/investments/crypto`, "POST", {
        amount: Number(amount),
        planId,
      });
      if (!res.success) {
        toast.error(res.message || "Failed to start plan");
        return;
      }
      toast.success(res.message || "Plan started successfully");
      setModalOpen(false);
      handleStatsFetch();
    } catch (err) {
      toast.error(err.message || "Network error");
      setModalOpen(false)
    } finally {
      setStartingPlan(false);
      setModalOpen(false)
    }
  };

  const stats = [
    {
      name: "Account Deposit",
      value: loading ? 0 : stat?.balance || 0,
      icon: "mdi:receipt-text-outline",
      color: "#2563eb",
      lineColor: "bg-blue-200",
    },
    {
      name: "Total Investment",
      value: loading ? 0 : stat?.totalInvestmentAmount || 0,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-6"
    >
      <KycVerifyNotice isVerified={false} />

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {stats.map((stat, i) => (
          <DashBoardStats key={i} {...stat} />
        ))}
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="w-full flex gap-6 flex-col md:flex-row">
          <div className="flex-[1_1_30%]">
            <ActionCard
              title="Crypto"
              imageSrc={cryptoInvest}
              icon={"streamline-freehand-color:crypto-currency-bitcoin-chip"}
            />
          </div>
          <div className="w-full rounded flex h-[300px] flex-[1_1_70%]">
            <TrendingMarket />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
          {plansLoading ? (
            <>
              <PlanSkeleton />
              <PlanSkeleton />
              <PlanSkeleton />
            </>
          ) : plans.length === 0 ? (
            <p className="text-gray-500 col-span-3 text-center text-xl">No investment plans available.</p>
          ) : (
            plans.map((plan) => (
              <PlanCard
                key={plan._id}
                title={plan.title}
                minDeposit={plan.minDeposit}
                maxDeposit={plan.maxDeposit}
                dailyProfit={plan.dailyProfit}
                duration={plan.contractDuration}
                color="text-blue-600 border border-blue-600"
                onClick={() => openModal(plan)}
              />
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-[500px] border border-gray-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              Enter Amount for{" "}
              <span className="text-xl text-blue-500">
                {selectedPlan.title}{" "}
              </span>
            </h2>
            <p className="text-md text-gray-400 font-semibold">
              max amount{" "}
              <span className="font-bold text-gray-600">
                ${selectedPlan.maxDeposit}
              </span>
            </p>
            <p className="text-md text-gray-400 font-semibold">
              min amount{" "}
              <span className="font-bold text-gray-600">
                ${selectedPlan.minDeposit}
              </span>
            </p>
            <input
              className="border p-2 mt-2 rounded w-full mb-4"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") {
                  setAmount("");
                  return;
                }
                const value = Number(raw);
                if (value > selectedPlan.maxDeposit) {
                  setAmount(selectedPlan.maxDeposit);
                } else if (value < selectedPlan.minDeposit) {
                  setAmount(value);
                } else {
                  setAmount(value);
                }
              }}
              min={selectedPlan.minDeposit}
              max={selectedPlan.maxDeposit}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleStartPlan}
                disabled={startingPlan}
              >
                {startingPlan ? "Starting..." : "Start Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default page;
