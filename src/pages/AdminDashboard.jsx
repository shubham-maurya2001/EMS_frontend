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
      <div className='flex-1 bg-white-200 h-screen'>
        <Skeleton_Navbar />
      </div>
    </div>)
  }
  return (
    <div className="flex flex-col relative">
      <AdminSidebar />
      <div className="sticky flex-1 bg-white-200 h-screen">
        <Navbar />
      </div>

      <div className="overflow-auto h-[calc(100vh-60px)]">
        <div className='pl-0 md:pl-60'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default AdminDashboard
