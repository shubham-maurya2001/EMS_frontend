import React from 'react'

const Skeleton_sidebar = () => {
  return (
    <div className='bg-gray-800 text-white w-0 space-y-2 h-screen fixed top-12 bottom-0 left-0 animate-pulse md:w-48'>
      <div className='px-4 py-3 space-y-4'>
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
