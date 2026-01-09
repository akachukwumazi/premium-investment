"use client";
import { useState, useEffect } from "react";
import ImageUploadBox from "@/components/ui/ImageUploadBox";
import { toast } from "react-toastify";
import { useApi } from "@/hooks/useApi";

export default function Page() {
  const { loading, apiRequest } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetImages, setResetImages] = useState(false);
  const [status, setStatus] = useState("unverified");

  const [uploadedImage, setUploadedImage] = useState({
    front: null,
    back: null,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    maritalStatus: "single",
    dob: "",
    idType: "national_id",
    idNumber: "",
    idFront: "",
    idBack: "",
  });

  function formatDate(dateString) {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  }
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchKycData = async () => {
    try {
      const res = await apiRequest("https://premium-invest-server-0aff.onrender.com/api/user/kyc/me", "GET");

      if (!res.success) {
        toast.error(res.message || "Failed to fetch KYC data");
        return;
      }

      const data = res.data;
      setStatus(res.data.status || "unverified");

      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        address: data.address || "",
        maritalStatus: data.maritalStatus || "",
        dob: formatDate(data.dob) || "",
        idType: data.idType || "",
        idNumber: data.idNumber || "",
        idFront: data.idFront || "",
        idBack: data.idBack || "",
      });

      console.log("KYC Data:", res);
    } catch (err) {
      console.error("Failed to fetch KYC data:", err);
    }
  };

  useEffect(() => {
    handleFetchKycData();
  }, [resetImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    form.append("address", formData.address);
    form.append(
      "maritalStatus",
      formData.maritalStatus === "" ? "single" : formData.maritalStatus
    );
    form.append("dob", formData.dob);
    form.append(
      "idType",
      formData.idType === "" ? "national_id" : formData.idType
    );
    form.append("idNumber", formData.idNumber);

    if (uploadedImage.front) form.append("idFront", uploadedImage.front);
    if (uploadedImage.back) form.append("idBack", uploadedImage.back);

    try {
      setIsSubmitting(true);

      const url =
        status === "rejected"
          ? "https://premium-invest-server-0aff.onrender.com/api/user/me/kyc/resubmit"
          : "https://premium-invest-server-0aff.onrender.com/api/user/kyc";

      const method = status === "rejected" ? "PATCH" : "POST";

      const res = await apiRequest(url, method, form);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(
        status === "rejected"
          ? "KYC resubmitted successfully"
          : "KYC submitted successfully"
      );

      setResetImages(true);
      setTimeout(() => setResetImages(false), 1000);
      handleFetchKycData();
    } catch (err) {
      toast.error(err.message || "KYC submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl p-6">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            value={formData.fullName}
            onChange={handleOnchange}
            name={"fullName"}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Permanent Address</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            value={formData.address}
            onChange={handleOnchange}
            type="text"
            name={"address"}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Marital Status</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none bg-white"
            value={formData.maritalStatus}
            onChange={handleOnchange}
            name={"maritalStatus"}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="widow">Widow</option>
            <option value="in a relationship">In a relationship</option>
            <option value="engaged">Engaged</option>
            <option value="separated">Separated</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            type="email"
            value={formData.email}
            onChange={handleOnchange}
            name={"email"}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Date of Birth (DOB)</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            type="date"
            value={formData.dob}
            onChange={handleOnchange}
            name={"dob"}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Mode of Identification</label>
          <select
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none bg-white"
            value={formData.idType}
            onChange={handleOnchange}
            name={"idType"}
          >
            <option value="national_id">NIN</option>
            <option value="drivers_license">Driver’s License</option>
            <option value="passport">Passport</option>
            <option value="social_security_number">
              Social Security Number
            </option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Identification Number</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            value={formData.idNumber}
            onChange={handleOnchange}
            name={"idNumber"}
          />
        </div>

        <div className="col-span-1 md:col-span-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <ImageUploadBox
              imageUrl={formData.idFront}
              onFileSelect={(file) =>
                setUploadedImage((prev) => ({ ...prev, front: file }))
              }
              reset={resetImages}
            />
            <ImageUploadBox
              imageUrl={formData.idBack}
              onFileSelect={(file) =>
                setUploadedImage((prev) => ({ ...prev, back: file }))
              }
              reset={resetImages}
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          {status === "rejected" ? (
            <button
              type="submit"
              className="w-full bg-premium-blue hover:bg-premium-blue/80 text-white py-3 rounded-xl text-sm font-medium"
            >
              {isSubmitting ? "Submitting..." : "Resubmit KYC"}
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-premium-blue hover:bg-premium-blue/80 text-white py-3 rounded-xl text-sm font-medium"
            >
              {isSubmitting ? "Submitting..." : "Submit KYC"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
