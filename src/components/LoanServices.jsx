"use client";
import React, { useEffect, useState } from "react";
import EmptyServices from "./EmptyServices";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const LoanServices = ({ reload }) => {
  const { apiRequest, loading } = useApi();
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const res = await apiRequest("/api/users/me/investments/loan/analytics", "GET");

      if (!res.success) {
        toast.error(res.message || "Error fetching loan analytics");
        return;
      }

      const data = Array.isArray(res.data) ? res.data : [res.data];
      setLoans(data);
      console.log("Loans:", data);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [reload]);

  const LoadingSkeleton = () => {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-400 text-green-800";
      case "pending":
        return "text-yellow-400 text-yellow-800";
      case "closed":
        return "text-gray-400 text-gray-800";
      default:
        return "text-blue-400 text-blue-800";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-md md:text-2xl text-premium-black">Active Loans</h3>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] md:min-w-full">
          <div className="grid grid-cols-7 w-full p-4 bg-purple-100 rounded-md">
            {["Loan ID", "Amount", "Borrowed", "Outstanding", "Balance", "Status", "Action"].map((title, i) => (
              <div key={i} className="flex gap-1 items-center justify-center">
                <p className="font-semibold text-sm md:text-md">{title}</p>
              </div>
            ))}
          </div>

          <div className="w-full  flex flex-col min-h-[40vh]">
            {loading ? (<LoadingSkeleton />) : null}
            {!loading && (
              loans.map((loan, i) => (
                <div
                  key={loan._id}
                  className="grid grid-cols-7 w-full p-4 border-b border-gray-200 hover:bg-purple-50 transition-all"
                >
                  <p className="text-center font-medium text-gray-800">{loan._id}</p>
                  <p className="text-center font-medium text-gray-800">${loan.amount?.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${loan.amount?.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${loan.interestAmount?.toLocaleString()}</p>
                  <p className="text-center font-medium text-gray-800">${(loan.amount + loan.interestAmount)?.toLocaleString()}</p>
                  <div className="flex justify-center">
                    <span className={`px-2 text-md font-semibold ${getStatusBadgeClass(loan.status)}`}>
                      {loan.status?.charAt(0).toUpperCase() + loan.status?.slice(1)}
                    </span>
                  </div>
                  <p className="text-center font-medium text-purple-600 cursor-pointer">View</p>
                </div>
              ))
            ) }
            {!loading && loans.length === 0 &&  ( <div className="w-full flex items-center justify-center h-full">

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
