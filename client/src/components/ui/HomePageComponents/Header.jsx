import React, { useState } from 'react'
import { CiDark, CiLight  } from "react-icons/ci";


const Header = () => {
    const [theme, setTheme] = useState("light");
    const themeToggle = () => {
        setTheme(theme=="light"? "dark" : "light");
    }


  return (
    <div className='bg-gray-300 rounded-2xl flex text-3xl h-full w-full justify-between px-4'>
      {/* Logo */}
      <div>
        Logo
      </div>

      {/* dark/light mode */}
      <div className='text-4xl'>
       <button onClick={themeToggle}>
        { theme=="light" &&  <CiDark />}
        { theme=="dark" &&  <CiLight />}
        
        </button> 
      </div>
    </div>
  )
}

export default Header
