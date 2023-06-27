import React from "react";
import { FiSun, FiSettings } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <div className="fixed z-50 bg-inherit bottom-0 w-[20%] h-[10%] flex items-center justify-center flex-row border-t-[1px] text-white gap-4">

        {/* Ligh/Dark Button */}
        <button className="flex h-fit items-center justify-center" >
          <FiSun /><span className="text-sm ml-2">Dark Mode</span>
        </button>

        {/* Settings Button */}
        <button className="h-fit flex items-center justify-center" >
          <FiSettings /><span className="text-sm ml-2">Settings</span>
        </button>

      </div>
    </>
  )
}

export default Footer