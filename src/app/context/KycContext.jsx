"use client";

import { createContext, useContext, useState } from "react";

const KycContext = createContext(null);

export function KycProvider({ children }) {
  const [status, setStatus] = useState("unverified");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <KycContext.Provider
      value={{
        status,
        setStatus,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </KycContext.Provider>
  );
}

export function useKyc() {
  const context = useContext(KycContext);

  if (!context) {
    throw new Error("useKyc must be used inside KycProvider");
  }

  return context;
}
