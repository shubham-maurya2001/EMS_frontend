import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'

let handleToggleAdmin = () => { };
const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    handleToggleAdmin = () => {
        setIsOpen(!isOpen);
    };

    const handleNavLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={`bg-gray-800 text-white w-48 space-y-2 h-screen fixed top-12 bottom-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className='px-4 py-3'>
                <NavLink to='/admin-dashboard' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} end onClick={handleNavLinkClick}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to='/admin-dashboard/employees' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>
                <NavLink to='/admin-dashboard/departments' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
                    <FaBuilding />
                    <span>Departments</span>
                </NavLink>
                <NavLink to='/admin-dashboard/leaves' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
                    <FaCalendarAlt />
                    <span>Leaves</span>
                </NavLink>
                <NavLink to='/admin-dashboard/salary/add' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink to='/admin-dashboard/setting' className='flex items-center space-x-4 py-2.5 px-4 rounded' onClick={handleNavLinkClick}>
                    <FaCogs />
                    <span>Setting</span>
                </NavLink>
            </div>
        </div>
    );
}

export default AdminSidebar
export { handleToggleAdmin }