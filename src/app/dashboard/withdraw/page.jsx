"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KycVerifyNotice from "@/components/ui/KycVerifyNotice";
import { Icon } from "@iconify/react";
import MiniLineChart from "@/components/ui/MiniLineChart";
import TableComponent from "@/components/TableComponents";
import WithdrawalForm from "@/components/WithdrawalForm";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

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
        <div className="w-16 h-[30px] rounded-full flex items-center justify-center bg-opacity-10">
          <MiniLineChart color={color} />
        </div>
      </div>
    </motion.div>
  );
}

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

const page = () => {
  const { apiRequest } = useApi();
  const [stat, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState(currencies[0]);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  // const { crypto, amount, walletAddress } = body;

  const handleWithdrawal = async () => {
    if (!crypto || !amount || !walletAddress) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setWithdrawalLoading(true);
      const body = {
        crypto: crypto.name,
        amount,
        walletAddress,
      };
      const res = await apiRequest("/api/withdrawals", "POST", body);
      if (!res.success) {
        toast.error(res.message || "Error in submitting withdrawal request");
        return;
      }
      toast.success(res.message || "Withdrawal request submitted successfully");
    } catch (err) {
      toast.error(err.message || "Network error");
    } finally {
      setWithdrawalLoading(false);
      setResetForm((prev) => !prev);
    }
  };

  const pulse = 0;

  const [tableData, setTableData] = useState([]);

  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const rowsPerPage = 10;

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

  const handleFetchHistory = async (page = 1, limit = rowsPerPage) => {
    try {
      const res = await apiRequest(
        `/api/withdrawals/history?page=${page}&limit=${limit}`,
        "GET"
      );

      if (!res.success) {
        toast.error(res.message || "Error in fetching your withdrawal history");
        return;
      }

      setTableData(res.data.withdrawals || []);

      console.log("withdrawals", res);

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
    handleFetchHistory(pagination.currentPage, rowsPerPage);
  }, [resetForm]);

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      handleFetchHistory(pagination.currentPage - 1, rowsPerPage);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      handleFetchHistory(pagination.currentPage + 1, rowsPerPage);
    }
  };

  const columns = [
    { label: "amount", icon: "mdi:currency-usd" },
    { label: "crypto", icon: "mdi:currency-btc" },
    { label: "requestedAt", icon: "mdi:calendar-month" },
    { label: "status", icon: "mdi:check-circle-outline" },
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
          <div className="flex flex-col w-full gap-3">
            <div className="flex gap-2 w-full">
              <DashboardStats
                name="Account Deposit"
                value={loading ? pulse : stat?.balance || 0}
                icon="mdi:receipt-text-outline"
                color="#2563eb"
                lineColor="bg-blue-200"
              />
              <DashboardStats
                name="Total Investment"
                value={loading ? pulse : stat?.totalInvestmentAmount || 0}
                icon="mdi:chart-line"
                color="#f97316"
                lineColor="bg-orange-200"
              />
            </div>

            <TableComponent
              title={"Withdrawal History"}
              columns={columns}
              data={tableData}
            />

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

          <div className="w-full">
            <WithdrawalForm
              setWalletAddress={setWalletAddress}
              setAmount={setAmount}
              setCrypto={setCrypto}
              crypto={crypto}
              currencies={currencies}
              onWithdrawal={handleWithdrawal}
              withdrawalLoading={withdrawalLoading}
              resetForm={resetForm}
            />
          </div>
        </div>
      </motion.h1>
    </div>
  );
};

export default page;
