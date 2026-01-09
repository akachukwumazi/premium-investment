"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import ActionCard from "@/components/ui/ActionCard";
import DashBoardStats from "@/components/ui/DashBoardStats";
import MarketInsightsChart from "@/components/MarketInsightsChart";
import RealEstateCard from "@/components/ui/RealEstateCard";
import RealEstateServices from "@/components/RealEstateServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const realEstate = "/real_estate_dashboard.jpg";

const Skeleton = () => (
  <div className="animate-pulse rounded-lg overflow-hidden border border-gray-200 shadow-sm">
    <div className="w-full h-40 bg-gray-300" />

    <div className="p-4 flex flex-col gap-3">
      <div className="h-5 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="h-4 w-1/4 bg-gray-200 rounded" />

      <div className="flex gap-2 mt-2">
        <div className="h-10 w-20 bg-gray-300 rounded" />
      </div>
    </div>
  </div>
);



const page = () => {
  const [realEstates, setRealEstates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [startingPlan, setStartingPlan] = useState(false);
  const [reloadServices, setReloadServices] = useState(false);
  const { apiRequest, loading } = useApi();

  const pulse = 0;

  const [stat, setStats] = useState();
  const handleStatsFetch = async () => {
    try {
      const res = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/users/me/dashboard", "GET");

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


  const openModal = (plan) => {
    setSelectedPlan(plan);
    setAmount("");
    setModalOpen(true);
  };

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
      value: loading ? pulse : stat?.totalInvestmentAmount || 0,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
  ];

  const handleRealEstateFetch = async () => {
    try {
      const res = await apiRequest("/api/investments/real-estate/plans", "GET");

      if (!res.success) {
        toast.error(res.message || "Error fetching real estate");
        return;
      }

      setRealEstates(res.data.plans);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleRealEstateFetch();
  }, []);


  const startRealEstateInvest = async (estate) => {
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (amount < selectedPlan.minInvestment) {
      toast.error("Amount can't be less than min investment");
      return;
    }
    try {
      setStartingPlan(true);
      const planId = selectedPlan._id;
      const res = await apiRequest(`/api/users/me/investments/real-estate`, "POST", {
        amount: Number(amount),
        planId,
      });
      if (!res.success) {
        toast.error(res.message || "Failed to start investment");
        return;
      }
      toast.success(res.message || "Investment started successfully");
      setModalOpen(false);
      handleStatsFetch();
    } catch (err) {
      toast.error(err.message || "Network error");
      setModalOpen(false)
    } finally {
      setStartingPlan(false);
      setModalOpen(false)
      setReloadServices(prev => !prev);
    }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-6"
    >
      <KycVerifyNotice />

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col w-full flex-[1_1_40%] gap-4">
          <div className="grid grid-cols-2 w-full gap-2 md:gap-4">
            {stats.map((stat, i) => (
              <DashBoardStats key={i} {...stat} />
            ))}
          </div>

          <div className="max-w-[500px] w-full">
            <ActionCard
              title="Real estate"
              imageSrc={realEstate}
              icon={"material-symbols:real-estate-agent-outline-rounded"}
            />
          </div>
        </div>

        <div className="flex w-full flex-[1_1_60%] border border-gray-100 rounded">
          <MarketInsightsChart />
        </div>
      </div>

      <div className="grid w-full md:grid-cols-3 gap-4">
        {loading && [...Array(3)].map((_, i) => <Skeleton key={i} />)}
        {!loading && realEstates.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">
            Unable to fetch real estate plans
          </p>
        )}

        {!loading &&
          realEstates.length > 0 &&
          realEstates.map((estate) => (
            <RealEstateCard
              key={estate._id}
              title={estate.title}
              location={estate.location}
              roi={`${estate.roiEstimate}%`}
              period={`${estate.investmentPeriod} days`}
              minInvestment={estate.minInvestment.toLocaleString()}
              investors={["AN", "KH", "SP"]}
              image={estate.imageUrl}
              onInvest={() => openModal(estate)}
            />
          ))}
      </div>

      <div className="flex gap-10 w-full flex-col">
        <RealEstateServices reload={reloadServices} />
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
              min amount{" "}
              <span className="font-bold text-gray-600">
                ${selectedPlan.minInvestment}
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
                if (value > selectedPlan.maxInvestment) {
                  setAmount(selectedPlan.minInvestment);
                } else if (value < selectedPlan.minInvestment) {
                  setAmount(value);
                } else {
                  setAmount(value);
                }
              }}
              min={selectedPlan.minInvestment}
              max={selectedPlan.maxInvestment}
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
                onClick={startRealEstateInvest}
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
