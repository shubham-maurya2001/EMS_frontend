import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { handleToggleAdmin } from './AdminSidebar'
import { handleToggleEmpLoyee } from '../EmployeeDashboard/Sidebar'

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center justify-between text-white h-12 bg-cyan-600 px-2 sticky top-0 z-50 '>
            <div className='space-x-2 flex md:items-center'>
                <button className='md:hidden' onClick={() => { user.role === 'admin' ? handleToggleAdmin() : handleToggleEmpLoyee() }}>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                    </svg>
                </button>
                <h3 className='hidden md:block text-2xl text-center font-play w-60'>Employee MS</h3>
                <p className='text-sm md:text-lg text-white'>Welcome {user.name}</p>
            </div>
            <button className='px-2 py-1 bg-cyan-800 rounded-md hover:bg-cyan-900 md:px-4 text-white' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
