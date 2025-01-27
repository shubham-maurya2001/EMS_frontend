import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'

const AdminSidebar = () => {
    return (
        <div className=' bg-gray-800 text-white w-20 space-y-2 h-screen fixed top-0 bottom-0 left-0 md:w-48'>
            <div className='bg-cyan-600 h-12 flex items-center justify-center'>
                <h3 className='text-sm text-center justify-center font-play md:text-2xl'>Employee MS</h3>
            </div>
            <div className='px-4'>
                <NavLink to='/admin-dashboard' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} end>
                    <FaTachometerAlt />
                    <span className='hidden md:block'>Dashboard</span>
                </NavLink>
                <NavLink to='/admin-dashboard/employees' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
                    <FaUsers />
                    <span className='hidden md:block'>Employees</span>
                </NavLink>
                <NavLink to='/admin-dashboard/departments' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} >
                    <FaBuilding />
                    <span className='hidden md:block'>Departments</span>
                </NavLink>
                <NavLink to='/admin-dashboard/leaves' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
                    <FaCalendarAlt />
                    <span className='hidden md:block'>Leaves</span>
                </NavLink>
                <NavLink to='/admin-dashboard/salary/add' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`}>
                    <FaMoneyBillWave />
                    <span className='hidden md:block'>Salary</span>
                </NavLink>
                <NavLink to='/admin-dashboard/setting' className='flex items-center space-x-4 py-2.5 px-4 rounded'>
                    <FaCogs />
                    <span className='hidden md:block'>Setting</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar
