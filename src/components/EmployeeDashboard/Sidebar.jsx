import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { user } = useAuth()
  return (
    <div className=' bg-gray-800 text-white w-20 space-y-2 h-screen fixed top-0 bottom-0 left-0 md:w-48'>
      <div className='bg-cyan-600 h-12 flex items-center justify-center'>
        <h3 className='text-sm text-center justify-center font-play md:text-2xl'>Employee MS</h3>
      </div>
      <div className='px-4'>
        <NavLink to='/employee-dashboard' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} end>
          <FaTachometerAlt />
          <span className='hidden md:block'>Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaUsers />
          <span className='hidden md:block'>My Profile</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} >
          <FaCalendarAlt />
          <span className='hidden md:block'>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaMoneyBillWave />
          <span className='hidden md:block'>Salary</span>
        </NavLink>
        <NavLink to='/employee-dashboard/setting' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
          <FaCogs />
          <span className='hidden md:block'>Setting</span>
        </NavLink>
      </div>
    </div >
  )
}

export default Sidebar
