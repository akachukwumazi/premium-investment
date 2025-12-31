"use client";
import { useApi } from "@/hooks/useApi";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoanCalculator({setReload}) {
  const { apiRequest, loading } = useApi();
  const [amount, setAmount] = useState();
  const [planId, setPlanId] = useState("");
  const [plans, setPlans] = useState([]);
  const [interest, setInterest] = useState("0000");
  const [repayment, setRepayment] = useState("0000");
  const [calculate, setCalculate] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]

  );
  const [repaymentDate, setRepaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [calculateText, setCalculateText] = useState("Calculate loan");
  const [requestText, setRequestText] = useState("Request loan");

  const handleCalculateLoan = async () => {
    try {
      setCalculateText("Calculating...");
      const res = await apiRequest(
        "/api/users/me/investments/loan/preview",
        "POST",
        {
          planId,
          amount,
          startDate,
        }
      );
      if (!res.success) {
        toast.error(res.message || "Error calculating loan");
        setCalculateText("Calculate loan");
        setCalculate(true);
        return;
      }
      setCalculateText("Calculate loan");

      setRepayment(res.data.preview.totalRepayable);
      setInterest(res.data.preview.interestAmount);
      const repaymentDate = new Date(res.data.preview.repaymentDate);
      const formattedDate = repaymentDate.toISOString().split("T")[0];
      setRepaymentDate(formattedDate);
      setCalculate((prev) => !prev);

    } catch (error) {
      setCalculateText("Calculate loan");
      toast.error(error.message || "Network error");
      setCalculate(true);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await apiRequest("/api/investments/loan/plans", "GET");
      if (!res.success) {
        toast.error(res.message || "Error fetching loan plans");
        return;
      }
      setPlans(res.data.plans);
      if (res.data.plans.length > 0) setPlanId(res.data.plans[0]._id);
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);


  const handleRequestLoan = async () => {
  try {
    setRequestText("Requesting...");
    
    
    const res = await apiRequest(
      "/api/users/me/investments/loan",
      "POST",
      {
        planId,
        amount,
        startDate,
      }
    );

    if (!res.success) {
      toast.error(res.message || "Error requesting loan");
      setRequestText("Request loan");
      return;
    }

    toast.success("Loan requested successfully!");
    setRequestText("Request loan");
    
   
    setCalculate(true);
    
  } catch (error) {
    toast.error(error.message || "Network error");
    setRequestText("Request loan");
  }finally {
    setCalculate(true);
    setReload((prev) => !prev);
    setRequestText("Request loan");
    
  }
};


  return (
    <div className="bg-gray-50 flex items-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full max-w-2xl">
        <h2 className="text-gray-800 font-semibold text-lg mb-4">
          Loan Calculator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Loan Plan
            </label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {plans.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} ({p.interest}% in {p.duration} Days)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Repayment Due Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={new Date().toISOString().split("T")[0]}
              value={repaymentDate}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Loan amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="$ 100,000"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Estimated Repayment
            </label>
            <input
              type="text"
              value={`$ ${repayment}`}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setStartDate(e.target.value)}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-600 mb-1 block">
              Interest Amount
            </label>
            <div className="flex items-center active:border-indigo-100 border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                value={`$ ${interest}`}
                // onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full p-2 outline-none border-none"
                readOnly
              />
            </div>
          </div>
        </div>

        {calculate ? (
          <button
            onClick={handleCalculateLoan}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-6 py-3 font-medium transition-all duration-200"
          >
            {calculateText}
          </button>
        ) : (
          <button
            onClick={handleRequestLoan}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-6 py-3 font-medium transition-all duration-200"
          >
            {requestText}
          </button>
        )}
      </div>
    </div>
  );
}
