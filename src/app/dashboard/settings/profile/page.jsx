"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useApi } from "@/hooks/useApi";
import { toast } from "react-toastify";

const Page = () => {
  const { apiRequest, loading } = useApi();
  const [saveLoading, setSaveLoading] = useState(false);
  const [refetchToggle, setRefetchToggle] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    state: "",
  });

  const handleFetchProfile = async () => {
    try {
      const res = await apiRequest("/api/users/me", "GET");

      if (!res.success) {
        toast.error(res.message || "Failed to fetch profile data");
        return;
      }

      const data = res.data;

      // Save profile response in state
      setProfile({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
      });
    } catch (error) {
      toast.error("An error occurred while fetching profile data");
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, [refetchToggle]);


  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const res = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/users/me", "PATCH", {
        address: profile.address,
        city: profile.city,
        state: profile.state,
      });
      if (!res.success) {
        toast.error(res.message || "Failed to update profile");
        return;
      }
      toast.success("Profile updated successfully");
      setRefetchToggle((prev) => !prev);
    } catch (error) {
      toast.error(error.message || "An error occurred while updating profile");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-xl p-6 space-y-4 bg-white rounded-lg border-2 border-gray-300">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <Icon
              icon="mdi:account"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              value={profile.fullName}
              readOnly
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Icon
              icon="mdi:email-outline"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="email"
              value={profile.email}
              readOnly
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="flex gap-2">
            <select
              className="flex-shrink-0 px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
              disabled
            >
              <option value="+234">🇳🇬 +234</option>
            </select>

            <input
              type="tel"
              value={profile.phoneNumber.replace("+234", "")}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <div className="relative">
            <Icon
              icon="mdi:map-marker-outline"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              value={profile.address}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
              onChange={handleOnchange}
              name="address"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={profile.city}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
            onChange={handleOnchange}
            name="city"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              value={profile.country}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={profile.state}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
              onChange={handleOnchange}
              name="state"
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button className="bg-premium-accent text-white px-4 py-2 rounded justify-end">
            {saveLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
