"use client";

import React from "react";

import { toast } from "react-toastify";

export const comingSoonToast = () => {
  toast.info("Oops… Coming Soon!", {
    position: "top-right",
    autoClose: 2000,
  });
};
