"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information that you explicitly provide to us when you create an account, apply for a loan, or use our investment services. This may include your name, email address, phone number, and financial data required to process your requests securely.",
  },
  {
    title: "2. How We Use Your Information",
    content: "Your data allows us to provide a personalized, secure, and compliant financial experience. We use this information to authenticate your identity, process transactions, prevent fraud, and inform you about new features that may help you achieve your financial goals.",
  },
  {
    title: "3. Data Protection and Security",
    content: "We implement industry-standard encryption, continuous monitoring, and secure access protocols to safeguard your personal data. We do not sell your data to third parties. Access to your sensitive information is strictly restricted to authorized personnel only.",
  },
  {
    title: "4. Your Privacy Rights",
    content: "Depending on your jurisdiction, you may have the right to access, modify, or delete your personal data. You can always manage your communication preferences from your account settings.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-premium-white text-premium-black py-20 pt-32 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-lg opacity-80">Last updated: April 2026</p>
        </div>

        <div className="w-full h-px bg-gray-200" />

        <div className="flex flex-col gap-8">
          <p className="text-lg leading-relaxed">
            At <strong>Premium Invest</strong>, we value your privacy above all else. This Privacy Policy outlines our transparent approach to managing and protecting the data you entrust us with. By using our platform, you agree to the practices described in this document.
          </p>

          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-3"
            >
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="text-lg leading-relaxed opacity-90">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 mt-4" />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Contact Us</h2>
          <p className="text-lg leading-relaxed opacity-90">
            If you have any questions or concerns regarding this Privacy Policy, please contact our support team at <a href="mailto:privacy@premiuminvest.com" className="font-semibold hover:underline">privacy@premiuminvest.com</a> or visit our <Link href="/contact" className="font-semibold hover:underline">Contact page</Link>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
