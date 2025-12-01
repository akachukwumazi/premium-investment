"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { twMerge } from "tailwind-merge";
import SubTopic from "./SubTopic";
import Image from "next/image";
import chooseUsImage from "../../../public/whychooseus_image.png";

const PElement = ({ children, variant }) => {
  return (
    <p
      className={twMerge(
        "font-normal text-[9px] md:text-[18px] text-center md:text-start leading-[150%] tracking-[-2%]",
        variant
      )}
    >
      {children}
    </p>
  );
};

const IconElement = function ({ icon, children, childrenDescription }) {
  return (
    <div className="w-full flex items-center gap-4 ">
      <div className="p-4 rounded-md flex items-center justify-center bg-premium-lightblue">
        {icon}
      </div>
      <div className="flex flex-col gap-2 pt-0 ">
        <PElement
          variant={
            "text-premium-black font-bold text-[16px] md:text-[24px] text-start leading-[120%] tracking-[2%] font-bold md:w-[75%]"
          }
        >
          {children}
        </PElement>
        <PElement
          variant={
            "text-premium-black text-[10px] md:text-[16px] text-start leading-[140%] tracking-[2%] md:w-[80%] "
          }
        >
          {childrenDescription}
        </PElement>
      </div>
    </div>
  );
};

const SubHeader = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center text-center ">
      <SubTopic styleVariant="text-sm"   >Why Choose Premium Investments</SubTopic>
      <PElement
        variant={
          "text-premium-black font-bold text-[16px] md:text-[35px] leading-[160%] font-bold md:w-[40%] md:text-center "
        }
      >
        Diverse Financial Solutions for a Modern World
      </PElement>
      <PElement variant={"md:w-[40%] md:text-center tracking-[2px]"}>
        At Premium Invest, we don’t just offer financial services we deliver
        confidence, security, and a clear path toward achieving your financial
        goals. Here’s why countless clients trust us to guide their investment
        journey.
      </PElement>
    </div>
  );
};

const WhyYouChoseUs = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 gap-6 bg-premium-bg ">
      <div className="w-[95%] max-w-[1200px] flex flex-col gap-16 text-center">
        <SubHeader />
        <div className="flex w-full flex-col md:flex-row items-center">
          <div className="flex flex-col gap-4">
            <IconElement
              childrenDescription={
                "We’ve weathered economic shifts, embraced new opportunities, and continuously evolved."
              }
              icon={
                <img
                  src="./empty-wallet-time.png"
                  alt="Wallet Icon"
                  width={30}
                />
              }
            >
              Over Two Decades of Investment Expertise
            </IconElement>
            <IconElement
              childrenDescription={
                "Prime Chain has strategically positioned itself in high-growth and high-potential regions."
              }
              icon={
                <img src="./wallet-cards.png" alt="Wallet Icon" width={30} />
              }
            >
              Strategic Presence in Major Global Markets
            </IconElement>
            <IconElement
              childrenDescription={
                "Our platform combines intelligent automation with personalized support to deliver seamless experiences."
              }
              icon={
                <img src="./document-text.png" alt="Wallet Icon" width={30} />
              }
            >
              Human-Centered Technology for Smarter Decisions
            </IconElement>
          </div>
            <figure className="mt-3 md:mt-0 ">
              <Image
                src={chooseUsImage}
                priority
                alt="why choose us image description"
                className="h-fit w-[100%] md-[413px] md:w-[608px] object-cover "
              />
            </figure>
        </div>
      </div>
    </div>
  );
};

export default WhyYouChoseUs;
