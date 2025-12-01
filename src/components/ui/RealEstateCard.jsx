"use client";

import Image from "next/image";

export default function RealEstateCard({
  title,
  location,
  roi,
  period,
  minInvestment,
  investors,
  image,
  onInvest,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 full shadow-sm hover:shadow-md transition-all duration-200">

      <h2 className="text-gray-600 font-bold text-md mb-1 ">{title}</h2>

 
      <p className="text-gray-700 font-semibold text-sm mb-3">{location}</p>


      <div className="w-full h-[110px] rounded-md overflow-hidden mb-3">
        <Image
          src={image}
          alt={title}
          width={270}
          height={110}
          className="object-cover w-full h-full"
        />
      </div>


      <p className="text-sm text-gray-700">
        ROI Estimate: <span className="font-semibold">{roi}</span>
      </p>
      <p className="text-sm text-gray-700 mb-3">
        Investment Period: <span className="font-semibold">{period}</span>
      </p>

      <div className="flex justify-between items-center mb-3">
        <div className="flex -space-x-3">
          {investors.slice(0, 3).map((i, idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] font-semibold text-gray-600"
            >
              {i}
            </div>
          ))}
          {investors.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] font-semibold text-gray-600">
              +{investors.length - 3}
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Min Investment</p>
          <p className="font-semibold text-gray-800">${minInvestment}</p>
        </div>
      </div>

      <button
        onClick={onInvest}
        className="w-full bg-[#3b5bff] hover:bg-[#3249d6] text-white py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Invest now
      </button>
    </div>
  );
}
