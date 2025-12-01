"use client"
import React, { useState } from 'react'




const Input = ({ label, type ="text", placeholder = " ", value, onChange, name, error, className, maxLength, onKeyDown }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

  return (

      <div className="relative w-full">
        <input
          type={inputType}
          id={label}
          name={name}
          placeholder={placeholder}
          className={`peer w-full border border-gray-400 rounded-md px-3 py-3 text-sm focus:border-[hsl(244,65%,45%)] focus:ring-1 focus:ring-[hsl(244,65%,45%)] outline-none ${className}`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
        />
        <label
          htmlFor={label}
          className={`absolute left-3 -top-2 bg-white px-1 text-[hsl(244,65%,45%)] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[hsl(244,65%,45%)]`}
        >
          {label}
        </label>

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 text-sm"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        ) : null}
        
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

  )
}

export default Input
