"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useApi } from "@/hooks/useApi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {

    const { apiRequest, loading, error } = useApi();

    const [errors,setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#^()\-_=+{};:,<.>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const Onchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await validationSchema.validate(formData, { abortEarly: false });

    const { confirmPassword, ...dataToSend } = formData;

    const response = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/auth/signup", "POST", dataToSend);

    toast.success("Sign Up Successful! 🎉");
    location.href="/auth/verify-email";
    localStorage.setItem("userEmail", formData.email);
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
      <main className="flex lg:w-[50%] h-full lg:p-2 flex-col items-center w-full justify-center lg:gap-5 lg:overflow-y-auto formRemove">
        <div className="flex  w-full items-center gap-2 lg:sticky -top-3 bg-white py-2 z-10">
          <Logo />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CEA744] to-[#0F172A]">
            PREMIUM-INVESTMENT
          </h1>
        </div>
        <form className="flex flex-col gap-2 w-full lg:w-full lg:p-3 mt-4 lg:mt-18 " onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold">Sign up</h3>
          <h5 className="text-gray-500">
            Sign up free and start growing your wealth today
          </h5>
          <Input
            name={"fullName"}
            label={"Your Name"}
            type={"text"}
            placeholder={""}
            onChange={Onchange}
            error={errors.fullName}
          />
          <Input
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={""}
            onChange={Onchange}
            error={errors.email}
          />
          <Input
            name={"phoneNumber"}
            label={"Phone Number"}
            type={"tel"}
            placeholder={""}
            onChange={Onchange}
            error={errors.phoneNumber}
          />
          <Input
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={""}
            onChange={Onchange}
            error={errors.password}
          />
          <Input
            name={"confirmPassword"}
            label={"Confirm Password"}
            type={"password"}
            placeholder={""}
            onChange={Onchange}
            error={errors.confirmPassword}
          />
          <Button name={"Sign Up"} isLoading={loading}/>
          <div className="flex w-full items-center gap-2">
            <hr className="flex-grow border-[#CEA744]" />
            <p className="text-center text-gray-500">or</p>
            <hr className="flex-grow border-[#CEA744]" />
          </div>
          <button
            className="bg-white border border-[#CEA744] text-black p-2 hover:scale-97 transition-all duration-300 rounded active:scale-98 shadow-gray-300 shadow-md text-xl font-bold flex items-center justify-center gap-2"
            type="button"
          >
            <img src="/plus.png" alt="Google logo" className="w-6 h-6" />
            Google
          </button>
          <p className="text-gray-500 text-center">
            Already have an account?{" "}
            <a href="login" className="text-[#CEA744] font-bold cursor-pointer">
              Log in
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
