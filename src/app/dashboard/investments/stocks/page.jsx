"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import ActionCard from "@/components/ui/ActionCard";
import DashBoardStats from "@/components/ui/DashBoardStats";
import StockCard from "@/components/ui/StockCard";
import StockAndBondServices from "@/components/StockAndBondServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const stockInvest = "/stocks_investment_dashboard.jpg";
const realEstate = "/real_estate_dashboard.jpg";

const StockCardSkeleton = () => {
  return (
    <div className="stock-card-skeleton">
      <div className="skeleton skeleton-image"></div>

      <div className="skeleton-content">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-symbol"></div>

        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-change"></div>

        <div className="skeleton skeleton-units"></div>

        <div className="skeleton-investors">
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton skeleton-avatar"></div>
        </div>

        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

const page = () => {
  const { apiRequest } = useApi();

  const [stocks, setStocks] = useState([]);
  const [stat, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const [reloadServices, setReloadServices] = useState(false);
  const [stockId, setStockId] = useState(null);

  const pulse = 0;

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

  const handleStatsFetch = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/api/users/me/dashboard", "GET");

      if (!res.success) {
        toast.error(res.message || "Error in fetching your stats");
        setLoading(false);
        return;
      }
      setStats(res?.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleStatsFetch();
  }, []);

  const handleBuy = async (stock) => {
    const planId = stock._id;
    try {
      setStockId(planId);
      const res = await apiRequest(
        "https://premium-invest-server-0aff.onrender.com/api/users/me/investments/stock-bond",
        "POST",
        { planId }
      );
      if (!res.success) {
        toast.error(res.message || "Error in purchasing stock plan");
        setStockId(null);
        return;
      }
      toast.success("Stock plan purchased successfully!");
      setStockId(null);
    } catch (err) {
      setStockId(null);
      toast.error(err.message || "Network error");
    } finally {
      setReloadServices((pre) => !pre);
    }
  };

  const handleStocksFetch = async () => {
    try {
      const res = await apiRequest("/api/investments/stock-bond/plans", "GET");

      if (!res.success) {
        toast.error(res.message || "Error fetching stocks");
        return;
      }

      console.log("stock", res.data.plans);
      setStocks(res.data.plans);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleStocksFetch();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-6"
    >
      <KycVerifyNotice />

      {/* Stats Section */}
      <div className="flex flex-col w-full flex-[1_1_40%] gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2 md:gap-4">
          {stats.map((stat, i) => (
            <DashBoardStats key={i} {...stat} />
          ))}
        </div>

        <div className="max-w-[500px] w-full">
          <ActionCard
            title="Stocks & Bonds"
            imageSrc={stockInvest}
            icon={"arcticons:stockswidget"}
          />
        </div>
      </div>

      {/* Stocks Cards */}
      <div className="grid md:grid-cols-3 w-full gap-4">
        {stocks.length === 0 && !loading && (
          <p className="col-span-3 text-center text-gray-500">
            No stock plans found
          </p>
        )}

        {loading && [...Array(3)].map((_, i) => <StockCardSkeleton key={i} />)}

        {stocks.map((stock) => (
          <StockCard
            key={stock._id}
            name={stock.title}
            symbol={stock.type?.toUpperCase()}
            type={stock.type}
            unitsHeld={stock.unitHeld}
            changePercent={stock.changePercent}
            currentPrice={stock.currentPrice}
            imageSrc={stock.imageUrl}
            onBuyClick={() => handleBuy(stock)}
            investors={["AN", "KH", "SP", "RT", "MJ"]}
            buttonText={stockId === stock._id ? "Loading..." : "Invest Now"}
          />
        ))}
      </div>

      <div className="flex gap-10 w-full flex-col">
        <StockAndBondServices reloadServices={reloadServices} />
      </div>
    </motion.div>
  );
};

export default page;
