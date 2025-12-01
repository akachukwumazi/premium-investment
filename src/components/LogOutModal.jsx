"use client";

import React from "react";
import { motion } from "framer-motion";

const LogOutModal = ({ isLoggedOut, onCancel }) => {
  if (!isLoggedOut) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className="bg-white rounded-xl p-6 w-[520px] shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-3 text-center">
          Are you sure you want to logout?
        </h2>

        <h3 className="text-xl text-center font-semibold text-gray-500">
          Your session will be ended, and you will be redirected to the login page
        </h3>

        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-4 text-xl font-mono rounded-lg border border-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button className="flex-1 py-4 text-xl font-mono rounded-lg bg-red-500 text-white">
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LogOutModal;
