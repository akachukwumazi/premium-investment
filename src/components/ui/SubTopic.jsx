import React from "react";
import { cn } from "@/lib/utils";

export default function SubTopic({ children, styleVariant = "" }) {
  return (
    <h5
      className={cn(
        `text-[10px] md:text-[20px] leading-[150%] tracking-[-2%] font-semibold text-premium-blue text-center md:text-start ${styleVariant} `
      )}
    >
      {children}
    </h5>
  );
}

