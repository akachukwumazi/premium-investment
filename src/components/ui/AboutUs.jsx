"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SubTopic from "./SubTopic";
import Image from "next/image";
import setusapartPhoto from "../../../public/setusapartimage.jpg";
import aboutUsPicture from "../../../public/aboutus_home.jpg";

const AboutUs = () => {
  const PElement = function ({ children, variant }) {
    return (
      <p
        className={`font-normal text-[9px] md:text-[18px] text-center md:text-start ${variant} leading-[150%] tracking-[-2%]`}
      >
        {children}
      </p>
    );
  };

  function AdvantageCard({ children }) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[15px] md:w-[50px] md:h-[23px] bg-premium-lightblue rounded-full text-premium-white flex items-center justify-center">
          <Check className="w-[7px] h-[7px] md:w-[14px] md:h-[14px]" />
        </div>
        <PElement variant="text-primeheaderblack text-start">
          {children}
        </PElement>
      </div>
    );
  }

  function WhatSetsUsApart() {
    return (
      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <div className="w-[95%] max-w-[1200px] flex flex-col md:flex-row md:justify-between">
          <figure className="w-[100%] md:w-[45%] mt-3 md:mt-0 h-[228px] md:h-[406px] order-2 md:order-1">
            <Image
              src={setusapartPhoto}
              priority
              height={456}
              width={486}
              alt="What sets us apart image"
              className="rounded-[12px] h-[100%] w-[100%] object-cover"
            />
          </figure>
          <div className="flex flex-col gap-4 w-full md:w-[50%] order-1 md:order-2">
            <SubTopic styleVariant="text-black font-bold text-start">
              What Sets Us Apart
            </SubTopic>
            <AdvantageCard>
              Global Expertise, Local Insight We operate across Africa, America,
              Europe, Asia, and other major markets, giving clients access to
              diversified growth opportunities worldwide
            </AdvantageCard>
            <AdvantageCard>
              Our platform is designed with user experience in mind, ensuring
              that you can easily navigate and access the information you need
              to make informed investment choices.
            </AdvantageCard>
            <AdvantageCard>
              We are committed to maintaining the highest standards of security
              and transparency, giving you peace of mind as you invest.
              and transparency, giving you peace of mind as you invest.
            </AdvantageCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      className="py-16 px-6 flex flex-col items-center gap-10 relative "
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <div className="w-[95%] max-w-[1200px] gap-6 flex flex-col mt-8">
          <SubTopic>About Us</SubTopic>
          <h3 className="text-[20px] md:text-[35px] text-primeheaderblack font-bold tracking-[-3%] w-[95%] md:w-[60%] text-center md:text-start ">
            Empowering Financial Futures Through Smarter, Ethical Investing
          </h3>
        </div>
        <div className="w-[95%] max-w-[1200px] flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <PElement variant="text-primeheaderblack max-w-4xl mx-auto">
              At Premium Invest, we are dedicated to revolutionizing the way you
              invest your money. Our platform leverages the power of blockchain
              technology to provide secure, transparent, and efficient
              investment opportunities. We believe in empowering our users with
              the tools and knowledge they need to make informed financial
              decisions.
            </PElement>
            <PElement variant="text-primeheaderblack max-w-4xl mx-auto">
              At Premium Invest, we are dedicated to revolutionizing the way you
              invest your money. Our platform leverages the power of blockchain
              technology to provide secure, transparent, and efficient
              investment opportunities. We believe in empowering our users with
              the tools and knowledge they need to make informed financial
              decisions.
            </PElement>

            <SubTopic>our mission</SubTopic>

            <PElement variant="text- max-w-4xl mx-auto">
              At Premium Invest, we are dedicated to revolutionizing the way you
              invest your money. Our platform leverages the power of blockchain
              technology to provide secure, transparent, and efficient
              investment opportunities. We believe in empowering our users with
              the tools and knowledge they need to make informed financial
              decisions.
            </PElement>
          </div>
          <figure className="w-[100%] md:w-[45%] mt-3 md:mt-0 h-[228px] md:h-[406px]">
            <Image
              src={aboutUsPicture}
              priority
              height="456"
              width="486"
              alt="About prime Chain image"
              className="rounded-[12px] h-[100%] w-[100%] object-cover"
            />
          </figure>
        </div>
        {/* <Image src="./youtube_video.jpg" alt="Description of image" /> */}
      </div>
      <WhatSetsUsApart />
    </motion.section>
  );
};

export default AboutUs;
