"use client";
import React, { useEffect, useState } from "react";
import EmptyServices from "./EmptyServices";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";

const RealEstateServices = ({ reload }) => {
  const [activities, setActivities] = useState([]);
  const { apiRequest, loading } = useApi();

  const handleFetchActivities = async () => {
    try {
      const res = await apiRequest(
        "/api/users/me/investments/real-estate/analytics",
        "GET"
      );

      if (!res.success) {
        toast.error(res.message || "Unable to load activities");
        setActivities([]);
        return;
      }

      console.log("analytics", res.data);
      setActivities(res.data);
    } catch (err) {
      toast.error(err.message || "Network Error");
      setActivities([]);
    }
  };

  useEffect(() => {
    handleFetchActivities();
  }, [reload]);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-800";
      case "pending":
        return "text-yellow-800";
      case "closed":
        return "text-gray-800";
      default:
        return "text-blue-800";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold text-md md:text-2xl text-premium-black">
        Real Estate Portfolio Table
      </h3>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] md:min-w-full">
          {/* Header */}
          <div className="grid grid-cols-6 w-full p-4 bg-purple-100 rounded-md">
            {[
              "Property ID",
              "Name / Location",
              "Type",
              "Current Value",
              "Status",
              "Action",
            ].map((title, i) => (
              <div key={i} className="flex items-center justify-center">
                <p className="font-semibold text-sm md:text-md">{title}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col min-h-[40vh]">
           
            {loading &&
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 w-full p-4 border-b border-gray-200 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                </div>
              ))}

            
            {!loading && activities.length === 0 && (
              <div className="w-full h-[50vh] flex justify-center items-center">
                <EmptyServices description="Your real estate portfolio is currently empty. Start building wealth by adding residential, commercial, or land assets today" />
              </div>
            )}

           
            {!loading &&
              activities.length > 0 &&
              activities.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 w-full p-4 border-b border-gray-200 hover:bg-purple-50 transition-all"
                >
                  
                  <p className="text-center font-medium text-gray-800">
                    {item._id?.slice(-6) || "N/A"}
                  </p>

                 
                  <div className="text-center font-medium text-gray-800">
                    <p>{item.plan.title}</p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>

                 
                  <p className="text-center font-medium text-gray-800">
                    {item.type || "Real Estate"}
                  </p>

                 
                  <p className="text-center font-medium text-gray-800">
                    ${item.amount?.toLocaleString() || "0"}
                  </p>

                  
                  <div className="flex justify-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  
                  <p className="text-center font-medium text-purple-600 cursor-pointer">
                    View
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateServices;
