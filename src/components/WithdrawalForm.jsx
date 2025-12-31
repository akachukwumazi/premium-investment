"use client";
import React, { useState } from "react";
import PlainInputs from "./PlainInputs";
import SubmitButton from "./Button";
import CustomSelect from "./ui/CustomSelect";

const WithdrawalForm = ({
  setWalletAddress,
  setAmount,
  setCrypto,
  crypto,
  currencies,
  onWithdrawal,
  withdrawalLoading,
  resetForm,
}) => {
  return (
    <div className="w-full flex flex-col gap-8 bg">
      <CustomSelect
        label="Select Currency"
        options={currencies}
        selected={crypto}
        onChange={setCrypto}
      />

      <PlainInputs onChange={setAmount} reset={resetForm} />
      <PlainInputs
        label={"Wallet address"}
        placeholder={"Enter your wallet address"}
        onChange={setWalletAddress}
        reset={resetForm}
      />
      <PlainInputs
        label={"Confirm wallet address"}
        placeholder={"Confirm your wallet address"}
        reset={resetForm}
      />
      <button
        className="text-lg font-semibold bg-amber-300/90 rounded active:scale-95 transition-all duration-200 py-3"
        onClick={onWithdrawal}
      >
        {withdrawalLoading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
};

export default WithdrawalForm;
