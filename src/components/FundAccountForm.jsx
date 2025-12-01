"use client";
import React, { useState } from "react";
import PlainInputs from "./PlainInputs";
import SubmitButton from "./Button";
import CustomSelect from "./ui/CustomSelect";
import PaymentDetails from "./ui/DepositAddressCard";
import ImageUploadBox from "./ui/ImageUploadBox";

const FundAccountForm = () => {


  const currencies = [
    {
      name: "BTC",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m4.706-11.436c-.174 1.053-.725 1.567-1.471 1.749c.992.555 1.47 1.398.959 2.877c-.635 1.854-2.057 2.022-3.94 1.663l-.486 1.957l-1.094-.271l.485-1.957q-.186-.049-.373-.091c-.172-.04-.35-.081-.526-.132l-.485 1.957l-1.092-.27l.485-1.958l-2.176-.592l.54-1.384s.822.226.81.212c.304.074.453-.14.514-.288l.776-3.137l.566-2.23c.024-.241-.052-.557-.497-.677c.03-.017-.8-.198-.8-.198l.323-1.312l2.243.556l.475-1.917l1.13.28l-.475 1.917c.291.064.574.14.866.215l.474-1.917l1.1.272l-.488 1.967c1.387.51 2.386 1.263 2.157 2.709m-5.1.39c.657.198 2.605.783 2.933-.52c.306-1.24-1.382-1.618-2.166-1.794q-.14-.03-.235-.055l-.587 2.353zm-1.014 3.82l.095.029c.81.24 3.106.923 3.418-.37c.32-1.246-1.744-1.731-2.669-1.949q-.153-.035-.258-.062z"
          />
        </svg>
      ),
    },
    {
      name: "ETH",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2L4 12l8 4l8-4l-8-10zm0 20l8-8l-8 4l-8-4l8 8z"
          />
        </svg>
      ),
    },
    {
      name: "USDT",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  //     const handleFile = (file) => {
  //   console.log("File uploaded:", file.name);
  // };



  return (
    <div className="w-full flex flex-col gap-4 bg">
      <CustomSelect
        label="Select Currency"
        options={currencies}
        selected={selectedCurrency}
        onChange={setSelectedCurrency}
      />

      <PlainInputs />
      <PaymentDetails
        label="BTC Deposit Address"
        address="283h976qwe9ry25r817gf31f4fk17f9g"
        warning="Send only BTC to this address."
      />
      <ImageUploadBox />

      <SubmitButton name="Withdraw" className="py-5" />
    </div>
  );
};

export default FundAccountForm;
