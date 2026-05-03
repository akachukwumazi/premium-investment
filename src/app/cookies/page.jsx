"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const cookieSections = [
  {
    title: "1. What Are Cookies?",
    content: "Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently as well as provide crucial information to the owners of the site.",
  },
  {
    title: "2. How We Use Cookies",
    content: "At Premium Invest, we use cookies to track user sessions, remember your preferences, and maintain a secure encrypted environment. Our cookies ensure you stay securely logged in to your investment dashboard without repeated interruptions.",
  },
  {
    title: "3. Types of Cookies We Use",
    content: "We predominantly use 'Essential Cookies' for authentication and security, and 'Performance Cookies' to understand how our users interact with the platform so we can continuously improve the experience. We do not use third-party tracking cookies for targeted advertising.",
  },
  {
    title: "4. Managing Your Cookies",
    content: "You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. Please note that declining our essential cookies will prevent you from accessing your secure dashboard.",
  },
];

const CookiePolicy = () => {
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
            Cookie Policy
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
            This Cookie Policy explains how <strong>Premium Invest</strong> uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control their use.
          </motion.p>

          {cookieSections.map((section, index) => (
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
          <h2 className="text-xl md:text-2xl font-bold">Have more questions?</h2>
          <p className="text-lg leading-relaxed opacity-90">
            If you have questions about how we use cookies, please email <a href="mailto:privacy@premiuminvest.com" className="font-semibold hover:text-blue-600 transition-colors">privacy@premiuminvest.com</a> or visit our <Link href="/privacy-policy" className="font-semibold hover:text-blue-600 transition-colors">Privacy Policy</Link> for more information.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;
