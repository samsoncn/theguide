import React from "react"
import { FiSun, FiSettings } from "react-icons/fi"

const Footer = () => {
  return (
    <>
      <div className="absolute bottom-0 w-[20%] h-[10%] flex items-center justify-end">
            <FiSun className="w-[50%] h-[30%]" />
            <FiSettings className="w-[50%] h-[30%]" />
      </div>
    </>
  )
}

export default Footer