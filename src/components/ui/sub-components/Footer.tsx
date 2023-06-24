import React from "react";
import { FiSun, FiSettings } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <div className="absolute bottom-0 w-[20%] h-[10%] flex items-center justify-center">

        {/* Ligh/Dark Button */}
        <button className="w-[50%] h-fit" >
          <FiSun className="mx-auto" />
        </button>

        {/* Settings Button */}
        <button className="w-[50%] h-fit items-center" >
          <FiSettings className="mx-auto" />
        </button>

      </div>
    </>
  )
}

export default Footer