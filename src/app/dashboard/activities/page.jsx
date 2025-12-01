"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";

const notifications = [
  {
    title: "New Plan Available",
    message:
      "This product is under active development and is available in a Private Beta, please contact Courier support for access.",
    type: "new",
    icon: "mdi:lightbulb-on-outline",
  },
  {
    title: "Investment Activated",
    message: "Your Premium Plan is now active.",
    type: "active",
    icon: "mdi:chart-line",
  },
  {
    title: "Profit Earned",
    message: "You earned $50 USDT from your active investment plan.",
    type: "profit",
    icon: "mdi:cash",
  },
  {
    title: "Plan Ending Soon",
    message: "Your Standard Plan will mature in 2 days.",
    type: "ending",
    icon: "mdi:alert-circle-outline",
  },
];

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen space-y-4 bg-gray-50 overflow-x-auto"
    >
      <KycVerifyNotice isVerified={false} />

      {notifications.map(({ icon, title, message, type }, i) => {
        let color = "";

        switch (type) {
          case "new":
            color = "border-yellow-400";
            break;
          case "active":
            color = "border-blue-500";
            break;
          case "profit":
            color = "border-green-500";
            break;
          case "ending":
            color = "border-red-500";
            break;
          default:
            color = "border-gray-300";
        }

        return (
          <div
            key={i}
            className={`border-l-4 ${color} bg-white p-4 rounded-md shadow-sm `}
          >
            <div className="flex items-center gap-2">
              <Icon icon={icon} className="text-xl" />
              <h3 className="font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm mt-1">{message}</p>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Page;
