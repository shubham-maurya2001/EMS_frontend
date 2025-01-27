import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Summary = () => {
  const { user } = useAuth()
  return (
    <div className='p-6'>
      <div className='rounded flex bg-gray-300'>
        <div className={`flex justify-center items-center bg-cyan-600 text-white px-2 md:text-3xl`}>
          {<FaUser />}
        </div>
        <div className='pl-4 py-1'>
          <p className='text-sm font-semibold md:text-md'>Welcome Back</p>
          <p className='text-xl font-bold'>{user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Summary
