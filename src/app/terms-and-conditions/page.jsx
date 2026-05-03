"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using Premium Invest, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.",
  },
  {
    title: "2. Investment Risks",
    content: "All investments involve risk, including the possible loss of principal. Past performance is no guarantee of future results. Premium Invest provides data and tools for informational purposes but does not guarantee specific investment outcomes.",
  },
  {
    title: "3. User Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.",
  },
  {
    title: "4. Intellectual Property",
    content: "The content, structure, design, and code of this platform are the intellectual property of Premium Invest. You may not reproduce, distribute, or create derivative works without our explicit, written consent.",
  },
  {
    title: "5. Termination",
    content: "We reserve the right to terminate or suspend your account and access to the services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.",
  },
];

const TermsAndConditions = () => {
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
            Terms and Conditions
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
            Welcome to <strong>Premium Invest</strong>. These terms and conditions outline the rules and regulations for the use of our platform. By registering and operating an account with us, you agree fully to this document.
          </motion.p>

          {termsSections.map((section, index) => (
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
          <h2 className="text-xl md:text-2xl font-bold">Still have questions?</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Reach out to our legal department at <a href="mailto:legal@premiuminvest.com" className="font-semibold hover:text-blue-600 transition-colors">legal@premiuminvest.com</a> or visit our <Link href="/contact" className="font-semibold hover:text-blue-600 transition-colors">Contact page</Link> if you need further clarification.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
