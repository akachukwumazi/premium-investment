"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const ActionCard = ({ title, imageSrc, onClick, icon, }) => {
  return (
    <div
      className="border h-80 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden w-full cursor-pointer p-4"
      onClick={onClick}
    >

      <div className="w-full h-56 overflow-hidden rounded-t-2xl">
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center px-2 md:px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon icon={icon} width={28} height={28} />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
