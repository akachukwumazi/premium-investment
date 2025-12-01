"use client";
import React, { useEffect, useState } from "react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import DashBoardStats from "@/components/ui/DashBoardStats";
import ActionCard from "@/components/ui/ActionCard";
import { motion } from "framer-motion";
import LoanCalculator from "@/components/LoanCalculator";
import LoanServices from "@/components/LoanServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";


const loanInvest = "/loan_investment_dashboard.jpg";



const page = () => {
const { apiRequest, loading } = useApi();

  const pulse = 0;
  const [stat, setStats] = useState();
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


   const statsData = [
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col gap-6"
    >
      <KycVerifyNotice />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {statsData.map((stat, i) => (
          <DashBoardStats key={i} {...stat} />
        ))}
      </div>
      <div className="w-full gap-6 flex flex-col">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="w-full max-w-[500px]">
            <ActionCard
              title="Loans"
              imageSrc={loanInvest}
              icon={"carbon:global-loan-and-trial"}
            />
          </div>
          <div className="bg-gray-50 flex items-center justify-center gap-3 flex-col md:h-80">
            <h2 className="font-semibold text-gray-400 text-2xl ">
              How It Works
            </h2>
            <div className="bg-white h-[80%] rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-gray-600 text-sm space-y-5 text-left h-full flex flex-col justify-center">
                <p className="text-[20px]">
                  <span className="font-semibold md:text-xl text-gray-800">Apply –</span>{" "}
                  Submit your loan request with required details.
                </p>
                <p className="text-[20px]">
                  <span className="font-semibold md:text-xl text-gray-800">Review –</span> We
                  assess eligibility and approve your request.
                </p>
                <p className="text-[20px]">
                  <span className="font-semibold md:text-xl text-gray-800">Disburse –</span>{" "}
                  Approved loans are credited to your wallet or bank.
                </p>
                <p className="text-[20px]">
                  <span className="font-semibold md:text-xl text-gray-800">Repay –</span> Pay
                  back in flexible installments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 w-full flex-col">
          <LoanCalculator />

          <LoanServices />
        </div>
      </div>
    </motion.div>
  );
};

export default page;
