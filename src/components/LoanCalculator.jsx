"use client"
import React, { useState } from "react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(100000);
  const [plan, setPlan] = useState("10% in 30 Days");
  const [interest, setInterest] = useState(10);
  const [repayment, setRepayment] = useState(114000);

  const handleCalculate = () => {
    const newRepayment = amount + (amount * interest) / 100;
    setRepayment(newRepayment);
  };

  return (
    <div className="bg-gray-50 flex items-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full max-w-2xl">
        <h2 className="text-gray-800 font-semibold text-lg mb-4">Loan Calculator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Loan amount */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Loan amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="$ 100,000"
            />
          </div>


          <div>
            <label className="text-sm text-gray-600 mb-1 block">Loan Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>10% in 30 Days</option>
              <option>20% in 60 Days</option>
              <option>30% in 90 Days</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="2025-08-11"
            />
          </div>


          <div>
            <label className="text-sm text-gray-600 mb-1 block">Repayment Due Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="2025-08-18"
            />
          </div>

          {/* Interest rate */}
          <div className="relative">
            <label className="text-sm text-gray-600 mb-1 block">Interest Rate</label>
            <div className="flex items-center active:border-indigo-100 border border-gray-300 rounded-lg overflow-hidden">
              <span className="bg-indigo-200 text-indigo-600 font-semibold px-3 py-2">%</span>
              <input
                type="number"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full p-2 outline-none border-none"
              />
            </div>
          </div>

          
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Estimated Repayment</label>
            <input
              type="text"
              value={`$ ${repayment.toLocaleString()}`}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>
        </div>

        
        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-6 py-3 font-medium transition-all duration-200"
        >
          Request loan
        </button>
      </div>
    </div>
  );
}
