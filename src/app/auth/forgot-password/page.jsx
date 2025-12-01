"use client";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "@/hooks/useApi";

const page = () => {
  const [email, setEmail] = useState(null);

  const { apiRequest, loading, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    localStorage.setItem("userEmail", email);

    try {
      const response = await apiRequest(
        `/api/auth/request-otp`,
        "POST",
        { email } // MUST BE AN OBJECT
      );

      toast.success("OTP sent successfully!");
      location.href = "/auth/otp";
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center lg:gap-10 lg:flex-row flex-col p-4">
      <main className="flex lg:w-[50%] h-full lg:p-2 flex-col items-center w-full justify-center gap-2 lg:overflow-y-auto test-scrollbar">
        <div className="flex  w-full items-center gap-2 bg-white py-2 ">
          <Logo />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CEA744] to-[#0F172A]">
            PREMIUM-INVESTMENT
          </h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full lg:p-3 h-full"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold">Forgot Password?</h3>
          <h5 className="text-gray-500">
            Enter your registered email or phone number. We’ll send you a
            one-time code to reset your password
          </h5>
          <Input
            label={"Email Address"}
            name={"email"}
            type={"email"}
            placeholder={""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" name={"Send OTP"} isLoading={loading} />
          <p className="text-gray-500 text-center">
            Remember your password?{" "}
            <a href="login" className="text-[#CEA744] font-bold cursor-pointer">
              Login
            </a>
          </p>
        </form>
      </main>
      <aside className="lg:w-[50%] w-full h-[40%] lg:h-full flex items-center justify-center relative">
        {/* <img src="src/assets/companyImage.jpg" alt="Building logo" className='h-full w-full hidden lg:block rounded-[1.6rem]'/> */}
        <Image
          src="/buildings.jpg"
          alt="City"
          fill
          className="h-full w-full hidden lg:block rounded-[1.6rem]"
        />
      </aside>
    </div>
  );
};

export default page;
