"use client";
import React, { useState } from "react";
import PlainInputs from "./PlainInputs";
import CustomSelect from "./ui/CustomSelect";
import PaymentDetails from "./ui/DepositAddressCard";
import ImageUploadBox from "./ui/ImageUploadBox";

const FundAccountForm = ({ onFileSelect ,selectedCurrency, setSelectedCurrency, currencies, setAmount, reset }) => {

  return (
    <div className="w-full flex flex-col gap-4 bg">
      <CustomSelect
        label="Select Currency"
        options={currencies}
        selected={selectedCurrency}
        onChange={setSelectedCurrency}
      />

      <PlainInputs 
        label="Amount to Deposit"
        type="number"
        name="amount"
        reset={reset}
        onChange={ (value) => setAmount(value) }
      />
      <PaymentDetails
        label={`Deposit Address`}
        address={selectedCurrency.address}
        warning={<>Send only <span className="font-semibold text-red-600">{selectedCurrency.name}</span> to this address.</>}
      />
      <ImageUploadBox onFileSelect={onFileSelect} reset={reset} />

     
    </div>
  );
};

export default FundAccountForm;
