import React from 'react'

const Skeleton_Navbar = () => {
  return (
    <div className='flex items-center justify-between text-white h-12 bg-cyan-600 px-2 animate-pulse'>
      <div className='h-6 bg-cyan-800 rounded w-1/4'></div>
      <div className='h-6 bg-cyan-800 rounded w-16'></div>
    </div>
  )
}

export default Skeleton_Navbar
