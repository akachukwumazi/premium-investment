"use client";

import { useState } from "react";


import ImageUploadBox from "@/components/ui/ImageUploadBox";

export default function Page() {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <div className="max-w-4xl p-6">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">


        <div className="space-y-1">
          <label className="text-sm font-medium">First Name</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="John"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Permanent Address</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder=""
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Last Name</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="Doe"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Marital Status</label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none bg-white">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="primechain@gmail.com"
            type="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Date of Birth (DOB)</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="MM/DD/YYYY"
            type="date"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Mode of Identification</label>
          <select className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none bg-white">
            <option>Choose</option>
            <option>NIN</option>
            <option>Driver’s License</option>
            <option>Passport</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Identification Number</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="Enter ID number"
          />
        </div>

        <div className="col-span-1">
          <ImageUploadBox onFileSelect={(file) => setUploadedImage(file)} />
        </div>


        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-premium-blue hover:bg-premium-blue/80 text-white py-3 rounded-xl text-sm font-medium"
          >
            Submit Document
          </button>
        </div>
      </form>
    </div>
  );
}

