"use client";
import React from 'react'
import { Icon } from '@iconify/react';
import Link from "next/link";

const KycVerifyNotice = ({isVerified}) => {
    if (isVerified) return null;

  return (
    <div className="w-full bg-yellow-600/30 rounded-md border flex justify-between items-center border-yellow-700 text-yellow-700 md:p-4 p-2 mb-6" role="alert">
        <div className='flex items-center md:gap-4 gap-2 '>
            <div className="flex items-center gap-3 bg-amber-100 p-2 rounded-full">
                <Icon icon="mdi:alarm" className="h-5 w-5" />
            </div>
            <p className="md:text-lg text-[10px]  text-yellow-800 font-semibold">Complete your KYC now to start investing, funding, and withdrawing securely. </p>
        </div>
        <Link href={"/dashboard/settings/kyc"} className="bg-yellow-700 md:text-lg text-[10px] w-[100px] md:w-max text-white py-1 md:py-2 px-2 md:px-4 rounded-md active:scale-95 transition-all duration-200">Verify Now</Link>
    </div>
  )
}

export default KycVerifyNotice
