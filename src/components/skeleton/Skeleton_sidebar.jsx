import React from 'react'

const Skeleton_sidebar = () => {
  return (
    <div className='bg-gray-800 text-white w-20 space-y-2 h-screen fixed top-0 bottom-0 left-0 animate-pulse md:w-48'>
      <div className='bg-cyan-600 h-12 flex items-center justify-center'>
        <h3 className='text-sm text-center justify-center font-play md:text-2xl'>Employee MS</h3>
      </div>
      <div className='px-4 space-y-4'>
        <div className='bg-gray-700 h-10 rounded'></div>
        <div className='bg-gray-700 h-10 rounded'></div>
        <div className='bg-gray-700 h-10 rounded'></div>
        <div className='bg-gray-700 h-10 rounded'></div>
        <div className='bg-gray-700 h-10 rounded'></div>
      </div>
    </div>
  )
}

export default Skeleton_sidebar
