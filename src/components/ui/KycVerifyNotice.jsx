"use client";
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import Link from "next/link";
import { useApi } from '@/hooks/useApi';

const KycVerifyNotice = () => {
    const { apiRequest, loading } = useApi();
    const [isVerified, setIsVerified] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchKycStatus = async () => {
            try {
                const res = await apiRequest("/api/users/me/kyc/me", "GET");
                console.log("response", res.data.status);


                if (res.data.status !== "approved") {
                    setIsVerified(false);
                    setStatus(res.data.status || "unverified");
                }
                else {
                    setIsVerified(true);
                    setStatus(res.data.status || "verified");
                    console.log(res);
                    
                    console.log("KYC is verified");
                }
                
             
            } catch (error) {
                console.error("Failed to fetch KYC status:", error);
            }
        };

        fetchKycStatus();
    }, []);


    if (isVerified) return null;


  return (
    <div className="w-full bg-yellow-600/30 rounded-md border flex justify-between items-center border-yellow-700 text-yellow-700 md:p-4 p-2 mb-6" role="alert">
        <div className='flex items-center md:gap-4 gap-2 '>
            <div className="flex items-center gap-3 bg-amber-100 p-2 rounded-full">
                <Icon icon="mdi:alarm" className="h-5 w-5" />
            </div>
            <p className="md:text-lg text-[10px]  text-yellow-800 font-semibold">Complete your KYC now to start investing, funding, and withdrawing securely. </p>
        </div>
        <Link href={"/dashboard/settings/kyc"} className="bg-yellow-700 md:text-lg text-[10px] w-[100px] md:w-max text-white py-1 md:py-2 px-2 md:px-4 rounded-md active:scale-95 transition-all duration-200">{status === "rejected" ? "Re-Submit" : status ===  "pending" ? "Pending" : "Verify Now"}</Link>
    </div>
  )
}

export default KycVerifyNotice
