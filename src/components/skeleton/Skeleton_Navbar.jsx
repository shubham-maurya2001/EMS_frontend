import React from 'react'

const Skeleton_Navbar = () => {
  return (
    <div className='flex items-center justify-between text-white h-12 bg-cyan-600 px-2 animate-pulse'>
      <div className='flex items-center space-x-5 '>
        <button className='md:hidden' >
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
        <h3 className='hidden md:block text-2xl text-center font-play'>Employee MS</h3>
        <p className='text-sm md:text-lg text-white bg-cyan-800 rounded w-28 h-6 animate-pulse'></p>
      </div>
      <div className='h-6 bg-cyan-800 rounded w-16'></div>
    </div>
  )
}

export default Skeleton_Navbar
