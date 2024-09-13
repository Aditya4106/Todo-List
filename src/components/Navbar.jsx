import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar bg-purple-800 text-white flex flex-col h-24 gap-3 w-full md:justify-between md:flex-row items-center md:h-20'>
        <div className="logo">
          <h1 className='font-bold font-serif text-5xl ml-5'>iTask</h1>
        </div>
        <ul className='flex space-x-4 text-xl mr-5'>
          <li className='home cursor-pointer'>Home</li>
          <li className='about cursor-pointer'>About</li>
          <li className='task cursor-pointer'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
