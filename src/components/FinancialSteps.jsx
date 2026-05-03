"use client";

import React from 'react';
import Link from 'next/link';

const FinancialSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Register an Account",
      description: "Create your free Prime Chain account in minutes. Provide your basic details, verify your identity, and set up a secure profile. No complicated forms, no hidden fees. Your information is encrypted and protected with industry-leading security.",
      desktopOrder: 1,
      mobileOrder: 1
    },
    {
      id: 2,
      title: "Start a Plan",
      description: "Select a financial plan that aligns with your goals. Whether you're interested in crypto, real estate, loans or secure savings, we've got smart, guided options ready for you. Choose your plan, set your preferences, and let Prime Chain do the heavy lifting with intelligent automation and expert-backed strategies.",
      desktopOrder: 2,
      mobileOrder: 3
    },
    {
      id: 3,
      title: "Fund Your Account",
      description: "Choose a funding method that works for you. Transfer funds securely through your preferred payment method bank transfer, card, crypto, or mobile wallet. Prime Chain supports multiple currencies and flexible funding options to suit your location and lifestyle.",
      desktopOrder: 3,
      mobileOrder: 2
    }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Getting Started in 3 Simple Steps
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 font-semibold mb-4 md:mb-6">
            Your Journey to Financial Freedom Begins Here
          </p>
          <p className="hidden md:block text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            We&apos;ve made it easy to start building your wealth with Prime Chain. Whether you&apos;re new to investing or looking to expand your portfolio, getting started takes just a few minutes
          </p>
          
          <div className="md:hidden text-left bg-white p-6 rounded-xl shadow-sm mb-8">
            <p className="text-lg text-gray-600 mb-4">
              At Prime Chain, we don&apos;t just offer financial services we deliver confidence, security, and a clear path toward your financial goals.
            </p>
            <p className="text-lg text-gray-600">
              Here&apos;s why thousands of clients trust us to guide their financial journey
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps
            .sort((a, b) => a.desktopOrder - b.desktopOrder)
            .map((step, index) => (
              <div 
                key={`desktop-${step.id}`} 
                className="hidden md:block"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                        {step.desktopOrder}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }

          {steps
            .sort((a, b) => a.mobileOrder - b.mobileOrder)
            .map((step, index) => (
              <div 
                key={`mobile-${step.id}`} 
                className="md:hidden"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold mr-4">
                      {step.mobileOrder}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 pt-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-14">
                    {step.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-lg text-lg md:text-xl transition duration-300 transform hover:scale-105">
            Get Started Today
          </Link>
          <p className="text-gray-500 text-sm md:text-base mt-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinancialSteps;