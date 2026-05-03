"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Lock, Activity, ServerOff } from "lucide-react";

const securityFeatures = [
  {
    title: "Bank-Grade Encryption",
    content: "All sensitive data on Premium Invest is protected using advanced AES-256 encryption. Whether your data is at rest or in transit, it is shielded from unauthorized access to ensure complete privacy and compliance.",
    icon: <Lock className="w-8 h-8 text-black mb-4" />
  },
  {
    title: "Continuous Monitoring",
    content: "Our infrastructure is monitored 24/7/365 by automated intrusion detection systems and specialized security teams. We actively search for and neutralize potential threats before they ever reach our perimeter.",
    icon: <Activity className="w-8 h-8 text-black mb-4" />
  },
  {
    title: "Multi-Factor Authentication",
    content: "We provide robust Multi-Factor Authentication (MFA) to ensure that only you can access your account, even if your password is compromised. You can secure your account using SMS, Email, or Authenticator apps.",
    icon: <ShieldCheck className="w-8 h-8 text-black mb-4" />
  },
  {
    title: "DDoS Protection",
    content: "Premium Invest operates on a highly resilient network backed by enterprise-level Distributed Denial of Service (DDoS) mitigation. We guarantee high availability so you can access your funds whenever you need them.",
    icon: <ServerOff className="w-8 h-8 text-black mb-4" />
  },
];

const Security = () => {
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
            Security & Trust
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
            At <strong>Premium Invest</strong>, the security of your funds and personal information is our absolute highest priority. We deploy cutting-edge security architecture to eliminate risks and allow you to invest with total peace of mind.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col p-8 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-100"
              >
                {feature.icon}
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h2>
                <p className="text-base leading-relaxed text-gray-600 opacity-90">{feature.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 mt-4" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100"
        >
          <h2 className="text-xl md:text-2xl font-bold">Report a Vulnerability</h2>
          <p className="text-lg leading-relaxed opacity-90">
            If you believe you have discovered a security vulnerability on our platform, please do not disclose it publicly. Reach out to our dedicated security team immediately at <a href="mailto:security@premiuminvest.com" className="font-semibold underline transition-colors">security@premiuminvest.com</a>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Security;
