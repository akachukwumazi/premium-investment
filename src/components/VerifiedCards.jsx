import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";



  const PElement = function ({ children, variant }) {
    return (
      <p
        className={`font-normal text-[9px] md:text-[18px] text-center md:text-start ${variant} leading-[150%] tracking-[-2%]`}
      >
        {children}
      </p>
    );
  };

function VerifiedBadge() {
  return (
    <div className="w-[120px] flex absolute top-11 right-0 md:flex-row md:items-center md:justify-between  bg-premium-bg rounded-xl shadow-md">
      <div className="w-full flex gap-2 p-2 items-center justify-between">
        <div className="flex items-center relative gap-3">
          <div className="justify-center w-[30px] transition-all duration-300 bg-premium-green rounded-full h-[30px] animate-ping absolute "></div>
          <div className="w-[30px] h-[30px] bg-premium-lightgreen rounded-full flex items-center justify-center bg-premium-lightgreen z-10">
            <Icon
              icon="lucide:check"
              className="w-[24px] h-[24px] text-premium-bg"
            />
          </div>
        </div>
        <h3 className="text-premium-black font-bold text-[10px] md:text-[14px] leading-[140%] tracking-[-2%] ">
          Verified
        </h3>
      </div>
    </div>
  );
}
const VerifiedCards = ({
  subtitle = "Subtitle",
  icon,
  description = "Description",
}) => {
  return (
    <div className="w-full relative flex flex-col md:flex-row md:items-center md:justify-between max-w-[400px] ">
      <VerifiedBadge />
      <div className="flex flex-col md:items-start gap-4 items-center text-center md:text-start mt-8 md:mt-8">
        <div className="h-[192px] md:h-[304px] pt-7 md:pt-10 pr-5 bg-premium-bg rounded-[12px] w-[100%] md:w-[384px] flex items-center justify-center bg-premium-white">
          <Image
            src={icon}
            alt={subtitle}
            width={384}
            height={384}
            className="rounded-bl-lg object-cover h-[100%] w-[100%]"
          />
        </div>
        <h4 className="text-premium-black text-start                                     w-full font-bold text-[12px] md:text-[18px] leading-[140%] tracking-[-2%] ">
          {subtitle}
        </h4>
        <PElement variant="text-premium-black font-normal text-[10px] md:text-[16px] leading-[140%] tracking-[-2%] mt-2">
          {description}
        </PElement>
      </div>
    </div>
  );
};

export default VerifiedCards;
