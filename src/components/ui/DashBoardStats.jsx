"use client"
import React from 'react'
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import MiniLineChart from "@/components/ui/MiniLineChart";



const DashBoardStats = ({ name, value, icon, color, lineColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-md md:rounded-2xl shadow-sm border border-gray-300 p-3 md:p-5 flex flex-col justify-between hover:shadow-md transition-all"
    >
      {/* Top section */}
      <div className="flex items-center gap-1 md:gap-3">
        <div
          className={`md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center ${lineColor} bg-opacity-10`}
        >
          <Icon icon={icon} color={color} className="md:h-6 md:w-6" />
        </div>
        <p className="text-gray-600 text-[11px] md:text-2xl font-medium">
          {name}
        </p>
      </div>

      {/* Bottom section */}
      <div className="flex items-end justify-between md:mt-6">
        <h2 className="md:text-2xl text-sm font-bold">${value}</h2>
        <div
          className={`w-16 h-[30px] rounded-full flex items-center justify-center  bg-opacity-10`}
        >
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

export default DashBoardStats
