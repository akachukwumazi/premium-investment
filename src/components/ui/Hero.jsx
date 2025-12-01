"use client";
import React from "react";
import { motion } from "framer-motion";
import DashboardPreview from "./DashboardPreview ";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center z-10"
      style={{
        backgroundImage: "url('/primechain-background.svg')",
      }}
    >
      {/* Overlay (for better text visibility) */}
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        className="relative  text-white px-6 md:px-0 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-[#CEA744]">Premium Invest</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Empowering your financial future with secure blockchain investments.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={"/auth/login"}
            className="bg-[#CEA744] text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-all duration-300"
          >
            Get Started
          </Link>
          <button className="border border-[#CEA744] px-6 py-3 rounded-full font-semibold hover:bg-[#CEA744]/20 transition-all duration-300">
            Learn More
          </button>
        </div>
      </motion.div>
      <div className="absolute left-1/2 -bottom-20 transform -translate-x-1/2 w-[95%] sm:w-full max-w-5xl px-2 sm:px-4">
        <DashboardPreview />
      </div>
    </section>
  );
};

export default Hero;
