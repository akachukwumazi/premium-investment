"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Users, Building2 } from "lucide-react";
import Link from "next/link";

const reports = [
  { year: "2025", title: "Annual Financial Report", type: "PDF", size: "4.2 MB" },
  { year: "2025", title: "Q3 Earnings Presentation", type: "PDF", size: "2.1 MB" },
  { year: "2025", title: "Q2 Financial Highlights", type: "PDF", size: "1.8 MB" },
  { year: "2025", title: "ESG & Sustainability Report", type: "PDF", size: "5.5 MB" },
  { year: "2024", title: "Annual Financial Report", type: "PDF", size: "4.0 MB" },
];

const InvestorRelations = () => {
  return (
    <div className="w-full min-h-screen bg-premium-white text-premium-black py-20 pt-32 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col gap-16"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Investor Relations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mt-2 leading-relaxed"
          >
            Transparency, compliance, and long-term value creation. Explore our financial reports, governance policies, and shareholder information.
          </motion.p>
        </div>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full h-px bg-gray-200" 
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black text-white p-8 rounded-3xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow"
          >
            <TrendingUp className="w-10 h-10 mb-4 text-gray-300" />
            <h3 className="text-4xl font-extrabold mb-1">$4.2B+</h3>
            <p className="text-gray-400 font-medium tracking-wide">Assets Under Management</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-gray-100 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow"
          >
            <Users className="w-10 h-10 mb-4 text-black" />
            <h3 className="text-4xl font-extrabold mb-1">150k+</h3>
            <p className="text-gray-500 font-medium tracking-wide">Active Institutional Clients</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-gray-100 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow"
          >
            <Building2 className="w-10 h-10 mb-4 text-black" />
            <h3 className="text-4xl font-extrabold mb-1">Tier-1</h3>
            <p className="text-gray-500 font-medium tracking-wide">Global Regulatory Compliance</p>
          </motion.div>
        </div>

        {/* Financial Reports */}
        <div className="flex flex-col gap-6 mt-6">
          <h2 className="text-3xl font-bold text-gray-900">Recent Financial Disclosures</h2>
          <div className="flex flex-col gap-4">
            {reports.map((report, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-bold mb-0.5 tracking-wide">{report.year}</span>
                    <h4 className="text-lg font-bold text-gray-900 transition-colors">{report.title}</h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6">
                  <span className="hidden md:block text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{report.type} • {report.size}</span>
                  <button className="flex items-center justify-center p-3 rounded-full bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between mt-6 bg-gray-50 p-10 rounded-3xl border border-gray-200"
        >
          <div className="flex flex-col gap-3 mb-6 md:mb-0 max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900">Shareholder Inquiries</h2>
            <p className="text-gray-600 text-lg">
              For questions regarding equity, corporate actions, or institutional investments, please contact our dedicated Investor Relations board.
            </p>
          </div>
          <Link 
            href="mailto:investors@premiuminvest.com" 
            className="px-8 py-4 bg-black text-white hover:bg-gray-800 font-bold rounded-full transition-transform hover:scale-105 shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            Email IR Board
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default InvestorRelations;
