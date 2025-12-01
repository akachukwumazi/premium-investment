"use client";
import React from 'react'
import { motion } from "framer-motion";
import SubTopic from './SubTopic';
import { Icon } from '@iconify/react';  
import VerifiedCards from '../VerifiedCards';
import cryptoImage from "../../../public/3d-rendering-blockchain-technology.png";
import escrowImage from "../../../public/escrow-service-image.png";
import loanImage from "../../../public/Personal-Loan-vs-Business-Loan.png";

const WhatWeOffer = () => {

    const PElement = function ({ children, variant }) {
    return (
      <p
        className={`font-normal text-[9px] md:text-[18px] text-center md:text-start ${variant} leading-[150%] tracking-[-2%]`}
      >
        {children}
      </p>
    );
  };





    function SubHeader() {
        return(
            <div className='w-full flex flex-col gap-2 pb-6'>
                <SubTopic>
                    What We Offer
                </SubTopic>
                <div className='w-full flex gap- flex-col md:flex-row md:items-center md:justify-between'>
                    <h2 className='text-[20px] text-center md:text-start md:text-[36px] leading-[140%] tracking-[-3%] font-bold text-premium-black md:w-[70%]'>
                        Driven by Innovation. Built on Trust. Committed to You
                    </h2>
                    <PElement variant={"w-[100%] md:w-[61%]"}>
                        At Premium invest, we provide forward-thinking financial services that empower individuals and businesses to thrive in today’s dynamic economic landscape. 
                    </PElement>
                </div>
            </div>
        )
    }



  return (
    <motion.section
        className="w-full flex flex-col items-center justify-center py-12 gap-4"
        style={{
        backgroundImage: "url('/whatweoffer_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

      }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <div className='w-[95%] max-w-[1300px] flex flex-col gap-6 mb-4'>
            <SubHeader/> 
            <div className='border-premium-lightgray w-full flex flex-col md:flex-row md:items-baseline md:justify-center gap-6'>
                <VerifiedCards 
                    subtitle={"Cryptocurrency Investments"}
                    icon={cryptoImage}
                    description={"We help you tap into the evolving world of digital assets with secure, guided access to the cryptocurrency market. Whether you’re a first-time investor or a seasoned trader"}
                />
                <VerifiedCards 
                    subtitle={"Escrow Services"}
                    icon={escrowImage}
                    description={"Whether you're buying property, investing in crypto, or making a large business deal, our Escrow Services provide a safe, neutral space for transactions. We act as a trusted third party to hold funds securely until both parties meet their obligations."}
                />
                <VerifiedCards 
                    subtitle={"Personal & Business Loans"}
                    icon={loanImage}
                    description={"At Premium Invest, we understand that access to capital is key to achieving your goals. Our loan solutions are crafted to empower your personal ambitions, fuel business growth, and support real estate ventures — all with speed, transparency, and ease."}
                />
            </div>
        </div>
    </motion.section>
  )
}

export default WhatWeOffer
