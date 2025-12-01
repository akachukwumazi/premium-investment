import React from 'react'
import { Icon } from "@iconify/react";

const SubmitButton = ({ name, isLoading, className }) => {

  return (
    <div>
      <button className={`bg-[#CEA744] text-white p-2 hover:bg-[#B58A2D] transition-all duration-300 rounded active:scale-98 shadow-gray-300 shadow-md text-xl font-bold w-full  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}  type='submit' disabled={isLoading}>
       {isLoading ? (
        <div className="flex items-center gap-2">
          <Icon icon="svg-spinners:blocks-shuffle-2" className="w-6 h-6 text-white" />
        </div>
        ) : name}
      </button>
    </div>
  )
}

export default SubmitButton