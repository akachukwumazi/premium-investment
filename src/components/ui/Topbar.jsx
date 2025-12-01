"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";

const TopBarSubHeader = [
  { name: "Dashboard", href: "/dashboard", icon: "mdi:home-roof" },
  {
    name: "Crypto",
    href: "/dashboard/investments/crypto",
    icon: "mdi:currency-btc",
  },
  {
    name: "Loans",
    href: "/dashboard/investments/loan",
    icon: "carbon:global-loan-and-trial",
  },
  {
    name: "Real estate",
    href: "/dashboard/investments/real-estate",
    icon: "ic:twotone-real-estate-agent",
  },
  {
    name: "Stocks & Bonds",
    href: "/dashboard/investments/stocks",
    icon: "mdi:chart-line",
  },
  {
    name: "Fund account",
    href: "/dashboard/fund-account",
    icon: "mdi:bank-transfer-in",
  },
  { name: "Withdraw", href: "/dashboard/withdraw", icon: "mdi:cash-minus" },
  {
    name: "Activities",
    href: "/dashboard/activities",
    icon: "mdi:chart-timeline-variant-shimmer",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "material-symbols:settings-outline",
  },
];

const Topbar = ({ onToggle, onNavClick }) => {
  const [me, setMe] = useState("Guest");
  const [profile, setProfile] = useState("GT");
  const pathname = usePathname();
  const { apiRequest, loading, error } = useApi();

  const handleMe = async () => {
    try {
      const res = await apiRequest("/api/users/me", "GET");

      // console.log(res);
      

      const fullName = res?.data?.fullName || "";
      setMe(fullName);

      
      const parts = fullName.trim().split(" ");

      const firstInitial = parts[0]?.[0]?.toUpperCase() || "";
      const secondInitial = parts[1]?.[0]?.toUpperCase() || "";

      const initials = firstInitial + secondInitial;

     
       setProfile(initials);
    } catch (err) {
      toast.error(err.message || "Error in getting personal data");      
    }
  };

  useEffect(() => {
    handleMe();
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="md:border-b md:border-gray-300 h-[7em] flex items-center px-6 md:bg-white shadow-sm justify-between"
    >
      <div className="flex items-center w-full lg:hidden h-max rounded-full px-2">
        <img src="./logo.png" alt="logo" className="w-13 h-8" />
        <p className="font-bold md:text-2xl lg:text-2xl">PREMIUM INVEST</p>
      </div>

      {/* Navigation Tabs */}
      <div className="hidden lg:flex gap-8 items-center">
        <div
          className="cursor-pointer rounded p-2 hover:bg-gray-100 active:scale-95 transition-all duration-300"
          onClick={onToggle}
        >
          <Icon icon="mdi:menu" width={34} height={34} />
        </div>

        {TopBarSubHeader.map(({ name, href, icon }) => {
          const isActive =
            href === "/dashboard/settings"
              ? pathname.startsWith(href)
              : pathname === href;

          return (
            isActive && (
              <div key={href} className="flex items-center gap-2">
                <Icon
                  icon={icon}
                  width={34}
                  height={34}
                  className="text-gray-600"
                />
                <h1 className="text-[24px] font-semibold">{name}</h1>
              </div>
            )
          );
        })}
      </div>

      <div className="flex items-center gap-5">
        <div className="cursor-pointer border border-gray-400 font-bold text-gray-500 rounded-full p-3 hover:bg-gray-100 active:scale-95 transition-all duration-300">
          {/* <Icon
            icon="mdi:account"
            className="text-gray-600 w-5 h-5 md:w-8 md:h-8"
          /> */}
          {profile}
        </div>
        <h3 className="hidden md:block font-semibold text-gray-800 text-xl">
          {loading ? (
            <div className="h-5 w-[150px] animate-pulse rounded bg-gray-300"></div>
          ) : (
            me
          )}
        </h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lg:hidden z-30 cursor-pointer"
          onClick={onNavClick}
        >
          <line x1="3" y1="5" x2="21" y2="5" />
          <line x1="7" y1="9" x2="21" y2="9" />
          <line x1="3" y1="13" x2="21" y2="13" />
          <line x1="7" y1="17" x2="21" y2="17" />
        </svg>
      </div>
    </motion.header>
  );
};

export default Topbar;
