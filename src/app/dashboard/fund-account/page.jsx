"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import { Icon } from "@iconify/react";
import MiniLineChart from "@/components/ui/MiniLineChart";
import TableComponent from "@/components/TableComponents";
import FundAccountForm from "@/components/FundAccountForm";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";
const currencies = [
  {
    name: "BTC",
    address: "bc1q9hd8k40lmf9w0c52x9r2f0v7kp3r9dk3m2s4t7",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
    address: "0x32ba9F8c7dE44C912A7D87C2814B79E29D981A3f",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
    address: "TQ4z9nbH2xr8f8cA1Lm2Vw6tP7dN8Qx4Yt",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "BNB",
    address: "bnb1x7qpl8h9f3k42h8j0s6f0p9czl8k5e4lx0ah7t",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2L7 7l5 5l5-5l-5-5zm0 7l-5 5l5 5l5-5l-5-5z"
        />
      </svg>
    ),
  },
  {
    name: "SOL",
    address: "8Hd92tWxgK5xvY7DfGJf0n4kS1ZyDA9wQYq8tVCwTjv",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect width="18" height="3" x="3" y="5" rx="1" fill="currentColor" />
        <rect width="18" height="3" x="3" y="10.5" rx="1" fill="currentColor" />
        <rect width="18" height="3" x="3" y="16" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "XRP",
    address: "rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M7 7c1.5-1.5 3-1.5 4.5 0l.5.5l.5-.5c1.5-1.5 3-1.5 4.5 0l-2 2c-.5-.5-1-.5-1.5 0l-1.5 1.5l-1.5-1.5c-.5-.5-1-.5-1.5 0L7 7zm10 10c-1.5 1.5-3 1.5-4.5 0l-.5-.5l-.5.5c-1.5 1.5-3 1.5-4.5 0l2-2c.5.5 1 .5 1.5 0l1.5-1.5l1.5 1.5c.5.5 1 .5 1.5 0l2 2z"
        />
      </svg>
    ),
  },
  {
    name: "DOGE",
    address: "D7Yh8mT8VqZ6Yq4Ew8ksR7z2RdF8G5JbP1",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="12"
          y="16"
          fontSize="10"
          textAnchor="middle"
          fill="currentColor"
        >
          Đ
        </text>
      </svg>
    ),
  },
  {
    name: "LTC",
    address: "ltc1qk9u24w0n8t7g5zq3m4w6u502x9m3frv0ef4cju",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M10 3l-2 10h2l-1 5h7l1-4h-4l2-11h-5z" />
      </svg>
    ),
  },
  {
    name: "ADA",
    address: "addr1qx0p34hd7wpx3e9hj6adf5usv9r9y8nppj42u6k3s25yfnxgn",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "TRX",
    address: "TXk8NdFu2xqK3BzP99e7y4LJ8tUf4ncD5H",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <polygon points="12 2 3 9 12 22 21 9" fill="currentColor" />
      </svg>
    ),
  },
];

function DashboardStats({ name, value, icon, color, lineColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-md md:rounded-2xl shadow-sm w-full border border-gray-300 p-3 md:p-5 flex flex-col justify-between hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-1 md:gap-3">
        <div
          className={`md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center ${lineColor} bg-opacity-10`}
        >
          <Icon icon={icon} color={color} className="md:h-6 md:w-6" />
        </div>
        <p className="text-gray-600 text-[11px] md:text-2xl font-medium">
          {name}
        </p>
      </div>

      <div className="flex items-end justify-between md:mt-6">
        <h2 className="md:text-2xl text-sm font-bold">${value}</h2>
        <div
          className={`w-16 h-[30px] rounded-full flex items-center justify-center bg-opacity-10`}
        >
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

const page = () => {
  const { apiRequest } = useApi();
  const [stat, setStats] = useState();
  const [amount, setAmount] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [fileSelect, setFileSelect] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const rowsPerPage = 10;

  const submitDeposit = async () => {
    if (!amount || !selectedCurrency || !fileSelect) {
      toast.error("Amount, currency, and screenshot are required");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("crypto", selectedCurrency.name);
    formData.append("proofOfPayment", fileSelect);
    setSubmitLoading(true);

    try {
      const res = await apiRequest("/api/funds", "POST", formData);

      if (!res.success) {
        toast.error(res.message || "Failed to submit deposit");
        setSubmitLoading(false);
        return;
      }

      toast.success("Deposit submitted successfully");
      setSubmitLoading(false);
      setAmount("");
      setFileSelect(null);
      setReset((prev) => !prev);
      setReload((prev) => !prev);
    } catch (err) {
      console.error("Deposit error:", err);
      toast.error(err.message || "Something went wrong");
      setSubmitLoading(false);
    }
  };

  const handleHistoryFetch = async (page = 1, limit = rowsPerPage) => {
    try {
      const res = await apiRequest(
        `/api/funds/history?page=${page}&limit=${limit}`,
        "GET"
      );
      if (!res.success) {
        toast.error(res.message || "Error in fetching your history");
        return;
      }

      setTableData(res.data.data || []);
      setPagination(
        res.data.pagination || {
          totalItems: 0,
          totalPages: 1,
          currentPage: page,
          pageSize: limit,
          hasNextPage: false,
          hasPrevPage: false,
        }
      );
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  useEffect(() => {
    handleHistoryFetch(pagination.currentPage, rowsPerPage);
  }, [reload]);

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      handleHistoryFetch(pagination.currentPage - 1, rowsPerPage);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      handleHistoryFetch(pagination.currentPage + 1, rowsPerPage);
    }
  };

  const pulse = 0;
  const handleStatsFetch = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/api/users/me/dashboard", "GET");
      if (!res.success) {
        toast.error(res.message || "Error in fetching your stats");
      }
      setStats(res?.data.data);
    } catch (err) {
      toast.error(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleStatsFetch();
  }, []);

  const columns = [
    { label: "amount", icon: "mdi:currency-usd" },
    { label: "crypto", icon: "mdi:currency-btc" },
    { label: "_createdAt", icon: "mdi:calendar-month" },
    { label: "status", icon: "mdi:check-circle-outline" },
  ];

  const withdrawalStats = [
    {
      name: "Account Deposit",
      value: loading ? pulse : stat?.balance || 0,
      icon: "mdi:receipt-text-outline",
      color: "#2563eb",
      lineColor: "bg-blue-200",
    },
    {
      name: "Total Investment",
      value: loading ? pulse : stat?.totalInvestmentAmount || 0,
      icon: "mdi:chart-line",
      color: "#f97316",
      lineColor: "bg-orange-200",
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <KycVerifyNotice />
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex flex-col w-full gap-3 ">
            <div className="flex gap-2 w-full">
              {withdrawalStats.map((stat, i) => (
                <DashboardStats key={i} {...stat} />
              ))}
            </div>

            <TableComponent
              title={"Deposit history"}
              columns={columns}
              data={tableData}
              reload={reload}
            />

            {/* Pagination Controls */}
            <div className="w-full flex justify-end mt-2 gap-2">
              <button
                onClick={handlePrevPage}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m15 6l-6 6l6 6"
                  />
                </svg>
              </button>
              <span className="px-3 py-1 border rounded">
                {pagination.currentPage} / {pagination.totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m9 6l6 6l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <p className="font-semibold text-2xl">
              Select Cryptocurrency and amount
            </p>
            <FundAccountForm
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              currencies={currencies}
              onFileSelect={setFileSelect}
              setAmount={setAmount}
              reset={reset}
            />
            <button
              className="text-lg font-semibold bg-amber-300/90 rounded active:scale-95 transition-all duration-200 py-3"
              onClick={submitDeposit}
            >
              {submitLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </motion.h1>
    </div>
  );
};

export default page;
