import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import Skeleton_Navbar from '../components/skeleton/Skeleton_Navbar'
import Skeleton_sidebar from '../components/skeleton/Skeleton_sidebar'

const AdminDashboard = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Simulate a loading delay of 1 second

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (<div className='flex'>
      <Skeleton_sidebar />
      <div className='flex-1 ml-20 bg-white-200 h-screen md:ml-48'>
        <Skeleton_Navbar />
      </div>
    </div>)
  }
  return (
    <div className='flex flex-col md:flex-row'>
      <AdminSidebar />
      <div className='flex-1 overflow-x-auto ml-20 bg-white-200 h-screen md:ml-48'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
