"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "@/hooks/useApi";

const page = () => {
  const array = [1, 2, 3, 4];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { apiRequest, loading, error } = useApi();
  const [slicedEmail, setSlicedEmail] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < array.length - 1) {
      const nextInput =
        e.target.parentElement.nextElementSibling?.querySelector("input");
      if (nextInput) {
        nextInput.focus();
      }
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const prevInput =
        e.target.parentElement.previousElementSibling?.querySelector("input");
      if (prevInput) {
        prevInput.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      const prevInput =
        e.target.parentElement.previousElementSibling?.querySelector("input");
      if (prevInput) {
        prevInput.focus();
      }
    }

    if (e.key === "ArrowRight" && index < array.length - 1) {
      const nextInput =
        e.target.parentElement.nextElementSibling?.querySelector("input");
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < array.length) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, array.length - 1);
    const inputs =
      e.target.parentElement.parentElement.querySelectorAll("input");
    if (inputs[lastIndex]) {
      inputs[lastIndex].focus();
    }
  };
  // const email = "akachukwu@gmail.com";
  const email = localStorage.getItem("userEmail");
  useEffect(() => {
    if (!email) return;

    const Email = email.split("@");
    const visible = Email[0].slice(0, 2);
    const domain = Email[1];

    setSlicedEmail(`${visible}***@${domain}`);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (otp.join("").length !== 4) {
        toast.error("Please enter complete 4-digit OTP");
        return;
      }

      if (!email) {
        toast.error("Email not found. Please request for otp again.");
        return;
      }

      const otpString = otp.join("");

      // const { confirmPassword, ...dataToSend } = formData;

      const response = await apiRequest("/api/auth/verify-otp", "POST", {
        email: email,
        otp: otpString,
      });

      toast.success("Sign Up Successful! 🎉");
      location.href = "/auth/login";
    } catch (err) {
      const newErrors = {};

      if (err.inner) {
        err.inner.forEach((element) => {
          newErrors[element.path] = element.message;
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form.", {
          className: "custom-toast-body",
        });
        return;
      }

      toast.error(err.message || "Sign Up Failed!");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center lg:gap-10 lg:flex-row flex-col p-4">
      <main className="flex lg:w-[50%] h-full lg:p-2 flex-col items-center w-full justify-center gap-2 lg:overflow-y-auto test-scrollbar">
        <div className="flex w-full items-center gap-2 bg-white py-2">
          <Logo />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CEA744] to-[#0F172A]">
            PREMIUM-INVESTMENT
          </h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full md:w-[70%] lg:p-3 h-full"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold">Enter OTP</h3>
          <h5 className="text-gray-500">
            We've sent a 6-digit code to {slicedEmail} Enter it below to continue
          </h5>
          <div className="flex w-full justify-between gap-4">
            {array.map((item, index) => (
              <Input
                key={item}
                className={`w-full h-16 text-center text-xl !rounded-[.6em]`}
                type="text"
                maxLength={1}
                placeholder="0"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div className="flex w-full items-center justify-end">
            <p className="text-gray-500 text-sm">
              Didn't receive the code?{" "}
              <a href="#" className="text-[#CEA744] font-bold cursor-pointer">
                Resend
              </a>
            </p>
          </div>
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
