"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Wallet, TrendingUp, BarChart3, Banknote } from "lucide-react";
import Link from "next/link";

const investmentSteps = [
  {
    title: "1. Create Your Account",
    content: "Registration takes less than two minutes. Provide your basic details, verify your email address, and complete a brief KYC (Know Your Customer) process to ensure total compliance and security.",
    icon: <UserCheck className="w-12 h-12 text-black" />
  },
  {
    title: "2. Fund Your Wallet",
    content: "Deposit funds into your secure Premium Invest wallet. We support multiple payment avenues including direct bank transfers, credit/debit cards, and select cryptocurrency deposits for global flexibility.",
    icon: <Wallet className="w-12 h-12 text-black" />
  },
  {
    title: "3. Select a Strategy",
    content: "Browse our expertly curated portfolios and select a strategy that aligns with your timeline, risk appetite, and financial goals. From conservative bonds to accelerated crypto assets, you are in control.",
    icon: <BarChart3 className="w-12 h-12 text-black" />
  },
  {
    title: "4. Watch It Grow",
    content: "Once deployed, our proprietary algorithms and financial experts manage the heavy lifting. You can monitor your daily accruals, track asset performance, and review detailed reports right from your dashboard.",
    icon: <TrendingUp className="w-12 h-12 text-black" />
  },
  {
    title: "5. Withdraw or Reinvest",
    content: "At the end of your investment cycle, your principal and generated profits are immediately available in your wallet. You can seamlessly withdraw to your bank account or compound your wealth by reinvesting.",
    icon: <Banknote className="w-12 h-12 text-black" />
  }
];

const InvestmentProcess = () => {
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
            The Investment Process
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl opacity-80 max-w-2xl mt-2"
          >
            We have streamlined the world of high-yield investing into 5 simple, transparent steps. From registration to withdrawal, your journey is entirely frictionless.
          </motion.p>
        </div>

        <div className="flex flex-col gap-10 w-full mt-8">
          {investmentSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative group"
            >
              {/* Abstract decorative number background */}
               <div className="absolute -right-6 -top-14 text-[220px] font-black text-gray-50 opacity-40 group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none">
                  {index + 1}
               </div>

              <div className="flex-shrink-0 bg-gray-50 p-6 rounded-3xl border border-gray-100 z-10 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                {React.cloneElement(step.icon, { className: "w-12 h-12 group-hover:text-white transition-colors duration-500 text-black" })}
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
            Start Investing Today
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvestmentProcess;
