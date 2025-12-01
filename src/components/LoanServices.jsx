"use client";

import React, { useEffect, useState } from "react";
import EmptyServices from "./EmptyServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const loans = [
  { loanId: "LN001", amount: 5000, borrowed: 3000, outstanding: 1500, balance: 1500, status: "Active", action: "View" },
  { loanId: "LN002", amount: 7500, borrowed: 5000, outstanding: 2000, balance: 2500, status: "Active", action: "View" },
  { loanId: "LN003", amount: 10000, borrowed: 8000, outstanding: 1000, balance: 2000, status: "Pending", action: "View" },
];

const LoanServices = () => {
  const { apiRequest, loading, error } = useApi();


  const pulse = 0;  
  const [stat, setStats] = useState();

  const handleFetchAnalytics = async () => {
    try {
      const res = await apiRequest("/api/users/me/investments/loan/analytics", "GET");
      if (!res.success) {
        toast.error(res.message || "Error in fetching loan analytics");
      } 
      console.log(res);
      
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleFetchAnalytics();
  }, []);
  




  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-md md:text-2xl text-premium-black">Active Loans</h3>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] md:min-w-full">
          {/* Header */}
          <div className="grid grid-cols-7 w-full p-4 bg-purple-100 rounded-md">
            {["Loan ID", "Amount", "Borrowed", "Outstanding", "Balance", "Status", "Action"].map((title, i) => (
              <div key={i} className="flex gap-1 items-center justify-center">
                <p className="font-semibold text-sm md:text-md">{title}</p>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="w-full flex flex-col min-h-[40vh]">
            {loans && loans.length > 0 ? (
              loans.map((loan, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 w-full p-4 border-b border-gray-200 hover:bg-purple-50 transition-all"
                >
                  <p className="text-center font-medium text-gray-800">{loan.loanId}</p>
                  <p className="text-center font-medium text-gray-800">${loan.amount.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${loan.borrowed.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${loan.outstanding.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${loan.balance.toLocaleString()}</p>
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(loan.status)}`}>
                      {loan.status}
                    </span>
                  </div>
                  <p className="text-center font-medium text-purple-600 cursor-pointer">{loan.action}</p>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <EmptyServices description="You haven’t applied for any loans yet. Get the funds you need with quick approval" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanServices;
