"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import React from "react";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { id: "profile", label: "Profile", path: "/dashboard/settings/profile" },
    { id: "password", label: "Password", path: "/dashboard/settings/password" },
    { id: "kyc", label: "KYC", path: "/dashboard/settings/kyc" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        
        className="w-full p-6"
      >
        <KycVerifyNotice />
        <div className="relative flex border-b-2 border-gray-300 justify-between pb-2 w-full  max-w-100">
          {tabs.map((tab) => {
            const isActive = pathname.includes(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => router.push(tab.path)}
                className={`relative pb-2 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab.label}

                {isActive && (
                  <motion.div
                    layoutId="settings-underline"
                    className="absolute left-0 right-0 h-[3px] bg-blue-700 rounded-full bottom-[-2px]"
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="mt-6">{children}</motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
