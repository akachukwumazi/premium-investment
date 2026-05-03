"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, FileSearch, Target, LineChart, CalendarCheck } from "lucide-react";
import Link from "next/link";

const advisorySteps = [
  {
    title: "1. Initial Consultation",
    content: "Schedule a one-on-one session with one of our certified wealth managers. We'll discuss your current financial situation, your lifestyle aspirations, and your long-term goals.",
    icon: <PhoneCall className="w-12 h-12 text-black" />
  },
  {
    title: "2. Financial Audit",
    content: "Our team conducts a comprehensive audit of your existing assets, liabilities, and investment portfolios to identify inefficiencies, tax gaps, and opportunities for immediate improvement.",
    icon: <FileSearch className="w-12 h-12 text-black" />
  },
  {
    title: "3. Custom Strategy Design",
    content: "We draft a bespoke, multi-faceted wealth generation strategy tailored explicitly to your risk tolerance. This covers asset allocation, retirement planning, and estate optimization.",
    icon: <Target className="w-12 h-12 text-black" />
  },
  {
    title: "4. Strategy Implementation",
    content: "With your approval, we execute the drafted strategy across global markets. Your capital is instantly deployed into high-performing, heavily vetted avenues.",
    icon: <LineChart className="w-12 h-12 text-black" />
  },
  {
    title: "5. Quarterly Reviews",
    content: "Your financial trajectory is consistently monitored. We provide detailed quarterly performance reviews and adjust your portfolio dynamically as market conditions and your personal goals evolve.",
    icon: <CalendarCheck className="w-12 h-12 text-black" />
  }
];

const AdvisoryServices = () => {
  return (
    <div className="w-full min-h-screen bg-premium-white text-premium-black py-20 pt-32 px-6 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col gap-16"
      >
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center leading-tight"
          >
            Expert Financial Advisory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl opacity-80 max-w-2xl mt-2"
          >
            Partner with elite wealth managers to map out your financial future. We provide institutional-grade advisory services to individuals and corporations.
          </motion.p>
        </div>

        <div className="flex flex-col gap-10 w-full mt-8">
          {advisorySteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? '-50px' : '50px' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative group"
            >
               <div className="absolute -right-6 -top-14 text-[220px] font-black text-gray-50 opacity-40 group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none">
                  {index + 1}
               </div>

              <div className="flex-shrink-0 bg-gray-50 p-6 rounded-3xl border border-gray-100 z-10 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                {React.cloneElement(step.icon, { className: "w-12 h-12 text-black group-hover:text-white transition-colors duration-500" })}
              </div>
              
              <div className="flex flex-col gap-3 z-10">
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{step.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl pr-4">{step.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center mt-16 mb-10"
        >
          <Link 
            href="/auth/signup" 
            className="px-12 py-6 rounded-full bg-black text-white font-bold text-xl hover:bg-gray-800 hover:scale-105 shadow-2xl transition-all duration-300 ring-4 ring-transparent hover:ring-gray-200"
          >
            Speak To An Advisor
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdvisoryServices;
