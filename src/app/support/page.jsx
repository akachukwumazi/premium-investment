"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, BookOpen, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const supportChannels = [
  {
    title: "24/7 Live Chat",
    description: "Get instant answers from our AI assistant or connect with a live human support agent for account help.",
    icon: <MessageCircle className="w-12 h-12 text-black mb-4" />,
    action: "Start Chat",
    href: "#"
  },
  {
    title: "Email Support",
    description: "Send us a detailed query. Our specialized teams typically respond to all technical or financial inquiries within 2 hours.",
    icon: <Mail className="w-12 h-12 text-black mb-4" />,
    action: "Send Email",
    href: "mailto:support@premiuminvest.com"
  },
  {
    title: "Knowledge Base",
    description: "Browse our comprehensive library of guides, walkthroughs, and FAQs to independently resolve common issues.",
    icon: <BookOpen className="w-12 h-12 text-black mb-4" />,
    action: "Visit FAQ",
    href: "/faq"
  },
  {
    title: "Priority Phone Line",
    description: "Exclusive to our Professional and Premium tier investors. Schedule a direct call with your dedicated account manager.",
    icon: <Phone className="w-12 h-12 text-black mb-4" />,
    action: "Schedule Call",
    href: "/auth/login"
  }
];

const SupportPage = () => {
  return (
    <div className="w-full min-h-screen bg-premium-white text-premium-black py-20 pt-32 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Support Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-500 max-w-2xl mt-2"
          >
            How can we assist you today? Choose from one of our dedicated support channels below.
          </motion.p>
        </div>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full h-px bg-gray-200 mt-6" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {supportChannels.map((channel, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="flex flex-col p-10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl border border-gray-100 group"
            >
              {channel.icon}
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{channel.title}</h2>
              <p className="text-lg leading-relaxed text-gray-600 mb-8 flex-grow">{channel.description}</p>
              
              <Link 
                href={channel.href} 
                className="flex items-center gap-2 font-bold text-black border-b-2 border-black w-max pb-1 group-hover:gap-4 transition-all"
              >
                {channel.action}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between mt-12 bg-gray-900 text-white p-10 rounded-3xl shadow-xl"
        >
          <div className="flex flex-col gap-3 mb-6 md:mb-0 max-w-lg">
            <h2 className="text-3xl font-bold">Lost or Stolen Card?</h2>
            <p className="text-gray-300 text-lg">
              If you suspect fraudulent activity on your account or have lost your premium access card, please freeze your account immediately.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors whitespace-nowrap shadow-lg hover:scale-105 transform duration-300"
          >
            Emergency Freeze
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SupportPage;
