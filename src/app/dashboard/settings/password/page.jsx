"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ oldPassword, newPassword, confirmPassword });
  };

  return (
    <div className="w-full  max-w-xl  rounded-md border-gray-300 border p-4">
      <form onSubmit={handleSubmit} className="space-y-6 w-full">

        <div className="space-y-1">
          <label className="text-sm font-medium">Old password</label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-600"
              placeholder="Old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">New password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-600"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Confirm new password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-600"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-premium-blue hover:bg-premium-blue/80 text-white py-3 rounded-xl text-sm font-medium transition"
        >
          Change password
        </button>
      </form>
    </div>
  );
}
