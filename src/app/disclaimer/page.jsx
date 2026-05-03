"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const disclaimerSections = [
  {
    title: "1. No Financial Advice",
    content: "The information provided on this platform does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the platform's content as such. Premium Invest simply provides a portal to view and manage investments you construct at your own risk.",
  },
  {
    title: "2. Investment Risk Warning",
    content: "Investing in financial markets, cryptocurrencies, and other speculative assets carries a high level of risk and may not be suitable for all investors. Before deciding to invest, you should carefully consider your investment objectives, level of experience, and risk appetite.",
  },
  {
    title: "3. Potential for Loss",
    content: "The possibility exists that you could sustain a loss of some or all of your initial investment. Therefore, you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with modern investing and seek advice from an independent financial advisor if you have any doubts.",
  },
  {
    title: "4. Accuracy of Information",
    content: "Premium Invest will strive to ensure accuracy of information provided on this website although it will not hold any responsibility for any missing or wrong information. You understand that you are using any and all information available here AT YOUR OWN RISK.",
  },
];

const Disclaimer = () => {
  return (
    <div className="w-full min-h-screen bg-premium-white text-premium-black py-20 pt-32 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl w-full flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Disclaimer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg opacity-80"
          >
            Last updated: April 2026
          </motion.p>
        </div>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full h-px bg-gray-200 origin-left" 
        />

        <div className="flex flex-col gap-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg leading-relaxed"
          >
            Please read this disclaimer carefully before using <strong>Premium Invest</strong>. This document explains the risks and limitations of liability associated with using our platform for financial decisions.
          </motion.p>

          {disclaimerSections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col gap-3 p-6 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              <p className="text-lg leading-relaxed text-gray-600 opacity-90">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 mt-4" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-xl md:text-2xl font-bold">Acknowledge Terms</h2>
          <p className="text-lg leading-relaxed opacity-90">
            By continuing to use this platform, you acknowledge that you have read and understood this disclaimer. Please also review our <Link href="/terms-and-conditions" className="font-semibold hover:text-blue-600 transition-colors">Terms & Conditions</Link> for full details.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
