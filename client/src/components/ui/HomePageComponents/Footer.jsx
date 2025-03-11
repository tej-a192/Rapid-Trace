import React from 'react'
import { GoHome, GoHistory  } from "react-icons/go";
import { IoCarOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { IoCalendarClearOutline } from "react-icons/io5";





const Footer = () => {
  return (
      <div className="flex lg:flex-col lg:w-20 lg:text-5xl lg:gap-y-8 text-3xl justify-between w-full  bg-gray-300 text-black p-4 shadow-lg rounded-2xl">
        <GoHome />
        <IoCalendarClearOutline />
        <IoCarOutline />
        <GoHistory />
        <HiOutlineUser /> 
    </div>
  )
}

export default Footer
