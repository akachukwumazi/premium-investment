"use client";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useApi } from "@/hooks/useApi";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Page = () => {
  const { apiRequest, loading } = useApi();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepMeLoggedIn: false, // ✅ ADD THIS
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await apiRequest(
        "https://premium-invest-server-0aff.onrender.com/api/auth/login",
        "POST",
        {
          email: formData.email,
          password: formData.password,
          keepMeLoggedIn: formData.keepMeLoggedIn, // ✅ SENT HERE
        },
      );

      toast.success("Login successful 🎉");
      location.href = "/dashboard";
    } catch (err) {
      const newErrors = {};

      if (err.inner) {
        err.inner.forEach((el) => {
          newErrors[el.path] = el.message;
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
        return;
      }

      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center lg:gap-10 lg:flex-row flex-col p-4">
      <main className="flex lg:w-[50%] h-full flex-col items-center w-full justify-center gap-2">
        <div className="flex w-full items-center gap-2 bg-white py-2">
          <Logo />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CEA744] to-[#0F172A]">
            PREMIUM-INVESTMENT
          </h1>
        </div>

        <form className="flex flex-col gap-2 w-full" onSubmit={handleOnSubmit}>
          <h3 className="text-2xl font-bold">Sign in</h3>

          <Input
            name="email"
            label="Email"
            type="email"
            onChange={handleOnChange}
            error={errors.email}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            onChange={handleOnChange}
            error={errors.password}
          />

          <div className="w-full flex justify-end">
            <a href="forgot-password" className="text-[#CEA744]">
              Forgot Password?
            </a>
          </div>

          {/* ✅ KEEP ME LOGGED IN */}

          <div className="w-full flex gap-2 items-center">
            <input
              type="checkbox"
              name="keepMeLoggedIn"
              id="keepMeLoggedIn"
              checked={formData.keepMeLoggedIn}
              onChange={handleOnChange}
              className="w-3 h-3 accent-[#CEA744]"
            />
            <label htmlFor="keepMeLoggedIn" className="text-gray-500 text-sm">
              Keep me logged in
            </label>
          </div>

          <Button name="Sign in" isLoading={loading} />
          <div className="w-full flex justify-center">
            <span>
              Don't have an account?{" "}
              <a href="/auth/signup" className="text-[#CEA744]">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </main>

      <aside className="lg:w-[50%] w-full h-[40%] lg:h-full relative">
        <Image
          src="/buildings.jpg"
          alt="City"
          fill
          className="hidden lg:block rounded-[1.6rem]"
        />
      </aside>
    </div>
  );
};

export default Page;
