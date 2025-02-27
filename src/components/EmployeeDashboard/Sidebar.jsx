import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

let handleToggleEmpLoyee = () => { };
const Sidebar = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false);

  handleToggleEmpLoyee = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`bg-gray-800 text-white w-60 space-y-2 h-screen fixed top-12 bottom-0 left-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`} >
      <div className='px-4 py-3'>
        <NavLink to='/employee-dashboard' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} end onClick={handleNavLinkClick}>
          <FaTachometerAlt />
          <span >Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
          <FaUsers />
          <span >My Profile</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
          <FaCalendarAlt />
          <span >Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
          <FaMoneyBillWave />
          <span >Salary</span>
        </NavLink>
        <NavLink to='/employee-dashboard/setting' className={({ isActive }) => `${isActive ? 'bg-cyan-500 ' : ' '}flex items-center space-x-4 py-2.5 px-4 rounded`} onClick={handleNavLinkClick}>
          <FaCogs />
          <span >Setting</span>
        </NavLink>
      </div>
    </div >
  )
}

export default Sidebar
export { handleToggleEmpLoyee }
