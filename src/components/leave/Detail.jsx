import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState(null);
  const navigate = useNavigate();

  const fetchLeave = async () => {
    try {
      const response = await axios.get(`https://ems-server-drab.vercel.app/api/leave/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        setLeaves(response.data.leaves[0])
      }
    } catch (error) {
      if (error.resopnse && !error.response.data.success) {
        alert(error.resopnse.data.error)
      }
    }
  };
  useEffect(() => {
    fetchLeave();
  }, [])

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://ems-server-drab.vercel.app/api/leave/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      if (error.response && !error.resopnse.data.success) {
        alert(error.resopnse.data.error);
      }
    }
  }
  return (
    leaves ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img className="rounded-full border w-72" src={`${leaves.employeeId.userId.profileImageUrl}`} alt="" />
          </div>
          <div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">Name:</p>
              <p className='font-medium'>{leaves.employeeId.userId.name}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">Employee ID:</p>
              <p className='font-medium'>{leaves.employeeId.employeeId}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">Leave Type:</p>
              <p className='font-medium'>{leaves.leaveType}</p>
            </div>

            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">Reason:</p>
              <p className='font-medium'>{leaves.reason}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">Department:</p>
              <p className='font-medium'>{leaves.employeeId.department.dep_name}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">From:</p>
              <p className='font-medium'>{new Date(leaves.startDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-lg font-bold">To:</p>
              <p className='font-medium'>{new Date(leaves.endDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-2">
              <p className="text-md font-bold">
                {leaves.status === 'Pending' ? 'Actions:' : 'Status:'}
              </p>
              {leaves.status === 'Pending' ? (
                <div className='flex space-x-2'>
                  <button
                    className='px-1 py-0.5 bg-green-500 hover:bg-green-700 rounded-md md:px-2'
                    onClick={() => changeStatus(leaves._id, 'Approved')}
                  >Approve</button>
                  <button
                    className='px-1 py-0.5 bg-red-500 hover:bg-red-700 rounded-md md:px-2'
                    onClick={() => changeStatus(leaves._id, 'Rejected')}
                  >Reject</button>
                </div>
              ) : <p className='text-sm font-medium md:text-md'>{leaves.status}</p>}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <div className='flex justify-center'>
          <h2 className="mb-8 bg-gray-300 w-2/6 h-8 rounded"></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center animate-pulse">
            <div className="rounded-full bg-gray-300 w-72 h-72"></div>
          </div>
          <div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
            <div className="flex justify-center space-x-3 mb-5 animate-pulse">
              <p className="text-md font-bold bg-gray-300 w-24 h-6 rounded"></p>
              <p className='font-medium bg-gray-300 w-48 h-6 rounded'></p>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Detail