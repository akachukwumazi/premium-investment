"use client";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useApi } from "@/hooks/useApi";
import * as Yup from "yup";
import { toast } from "react-toastify";

const page = () => {
  const { apiRequest, loading, error } = useApi();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validationSchema = Yup.object({
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
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const { confirmPassword, ...dataToSend } = formData;

      const response = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/auth/login", "POST", dataToSend);
      toast.success("Sign Up Successful! 🎉");
      location.href = "/dashboard";
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
        <div className="flex  w-full items-center gap-2 bg-white py-2 ">
          <Logo />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CEA744] to-[#0F172A]">
            PREMIUM-INVESTMENT
          </h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full lg:p-3 h-full "
          onSubmit={handleOnSubmit}
        >
          <h3 className="text-2xl font-bold">Sign in</h3>
          <h5 className="text-gray-500">
            Please login to continue with your account.
          </h5>
          <Input
            name={"email"}
            label={"Email"}
            type={"email"}
            placeholder={""}
            onChange={handleOnChange}
            error={errors.email}
          />
          <Input
            name={"password"}
            label={"Password"}
            type={"password"}
            placeholder={""}
            onChange={handleOnChange}
            error={errors.password}
          />
          <div className="w-full flex justify-end">
            <a href="forgot-password" className="text-[#CEA744]">
              Forgot Password?
            </a>
          </div>
          <div className="w-full flex gap-2 items-center">
            <input
              type="checkbox"
              name="keepLoggedIn"
              id="keepLoggedIn"
              className="w-3 h-3 accent-[#CEA744]"
            />
            <label htmlFor="keepLoggedIn" className="text-gray-500 text-sm">
              Keep me logged in
            </label>
          </div>
          <Button name={"Sign in"} isLoading={loading} />
          <div className="flex items-center w-full justify-center relative bg-white gap-2">
            <hr className="border-[gray] flex-grow" />
            <p className="bg-white text-center text-gray-500">or</p>
            <hr className="border-[gray] flex-grow" />
          </div>
          <button
            className="bg-white border border-gray-500 text-black p-2 hover:scale-97 transition-all duration-300 rounded active:scale-98 shadow-gray-300 shadow-md text-xl font-bold flex items-center justify-center gap-2"
            type="button"
          >
            <img src="/plus.png" alt="Google logo" className="w-6 h-6" />
            Google
          </button>
          <p className="text-gray-500 text-center">
            New to premium?{" "}
            <a
              href="signup"
              className="text-[#CEA744] font-bold cursor-pointer"
            >
              Create an account
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
