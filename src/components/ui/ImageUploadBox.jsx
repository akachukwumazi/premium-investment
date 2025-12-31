"use client";
import React, { useState, useEffect, useId } from "react";
import { Image } from "lucide-react";

const ImageUploadBox = ({ onFileSelect, reset, imageUrl }) => {
  const uniqueId = useId(); 
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(imageUrl || null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleFile = (file) => {
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    if (onFileSelect) onFileSelect(file);
  };

  useEffect(() => {
    if (reset) setPreview(null);
    else setPreview(imageUrl || null);
  }, [reset, imageUrl]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!preview && (
        <label
          htmlFor={uniqueId}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-center h-56 transition w-full max-w-[500px]
            ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"}
          `}
        >
          <Image className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-gray-600">
            Drop your <span className="font-medium">Screenshot</span> here, or
          </p>
          <span className="text-blue-500 hover:underline cursor-pointer">
            Click to browse
          </span>
          <input
            id={uniqueId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      )}

      {preview && (
        <div className="w-[450px] mb-3 h-56 flex flex-col items-center gap-2">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg shadow-md object-cover border-dashed border-2 border-gray-400 h-full w-full"
          />
          <input
            id={uniqueId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          <label
            htmlFor={uniqueId}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Change image
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploadBox;
