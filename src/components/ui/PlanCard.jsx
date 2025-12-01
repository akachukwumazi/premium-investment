"use client";
import React from "react";
import { Icon } from "@iconify/react";

const PlanCard = ({
  icon = "mdi:book-open-variant",
  title,
  minDeposit,
  maxDeposit,
  dailyProfit,
  duration,
  onClick,
  color = "",
}) => {
  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white w-full p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon icon={icon} width={24} height={24} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Deposit Info */}
      <div className="text-gray-600 text-base space-y-1 mb-3">
        <p>
          Minimum deposit:{" "}
          <span className="font-semibold text-gray-900">${minDeposit}</span>
        </p>
        <p>
          Maximum deposit:{" "}
          <span className="font-semibold text-gray-900">${maxDeposit}</span>
        </p>
      </div>

      {/* Benefits */}
      <ul className="text-gray-700 text-base space-y-2 mb-6">
        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:check-circle"
            className="text-blue-600"
            width={18}
            height={18}
          />
          {dailyProfit}% Daily Profits
        </li>
        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:check-circle"
            className="text-blue-600"
            width={18}
            height={18}
          />
          Contract duration: {duration} days
        </li>
      </ul>

      <button
        onClick={onClick}
        className={`${color} w-full py-3 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 active:scale-95 hover:cursor-pointer`}
      >
        Start Plan
      </button>
    </div>
  );
};

export default PlanCard;
