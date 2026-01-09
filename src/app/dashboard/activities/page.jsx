"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const Page = () => {
  const { apiRequest, loading } = useApi();
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/users/me/activities", "GET");

      if (!res.success) {
        toast.error(res.message || "Failed to fetch activities");
        return;
      }

      setActivities(res.data || []);  
    } catch (error) {
      toast.error("An error occurred while fetching activities");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

 
  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  const getIcon = (action) => {
    if (!action) return "mdi:information-outline";

    const lower = action.toLowerCase();
    if (lower.includes("bonus")) return "mdi:gift-outline";
    if (lower.includes("deposit")) return "mdi:bank-transfer-in";
    if (lower.includes("withdraw")) return "mdi:bank-transfer-out";
    if (lower.includes("plan")) return "mdi:chart-line";
    if (lower.includes("profit")) return "mdi:cash";

    return "mdi:bell-outline";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen space-y-4 bg-gray-50 overflow-x-auto"
    >
      <KycVerifyNotice />


      {activities.length === 0 && (
        <div className="text-center text-gray-600 py-10">
          No activities yet.
        </div>
      )}


      {activities.map((item) => (
        <div
          key={item._id}
          className="border-l-4 border-blue-500 bg-white p-4 rounded-md shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Icon icon={getIcon(item.action)} className="text-xl text-blue-600" />
            <h3 className="font-bold text-gray-900">{item.action}</h3>
          </div>

          <p className="text-gray-600 text-sm mt-1">{item.details}</p>
          <p className="text-gray-400 text-xs mt-2">
            {formatDate(item.timestamp)}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default Page;
