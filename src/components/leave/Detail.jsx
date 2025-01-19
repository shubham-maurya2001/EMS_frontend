import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState(null);
  const navigate = useNavigate();

  const fetchLeave = async () => {
    try {
      const response = await axios.get(`https://ems-server-rust.vercel.app/api/leave/${id}`, {
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
      const response = await axios.put(`https://ems-server-rust.vercel.app/api/leave/${id}`, { status }, {
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
            <img className="rounded-full border w-72" src={`http://localhost:5000/${leaves.employeeId.userId.profileImage}`} alt="" />
          </div>
          <div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Name:</p>
              <p className='font-medium'>{leaves.employeeId.userId.name}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Employee ID:</p>
              <p className='font-medium'>{leaves.employeeId.employeeId}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Leave Type:</p>
              <p className='font-medium'>{leaves.leaveType}</p>
            </div>

            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Reason:</p>
              <p className='font-medium'>{leaves.reason}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">Department:</p>
              <p className='font-medium'>{leaves.employeeId.department.dep_name}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">From:</p>
              <p className='font-medium'>{new Date(leaves.startDate).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">To:</p>
              <p className='font-medium'>{new Date(leaves.endDate).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-3 mb-2">
              <p className="text-lg font-bold">
                {leaves.status === 'Pending' ? 'Actions:' : 'Status:'}
              </p>
              {leaves.status === 'Pending' ? (
                <div className='flex space-x-2'>
                  <button
                    className='px-2 py-0.5 bg-green-500 hover:bg-green-700 rounded-md'
                    onClick={() => changeStatus(leaves._id, 'Approved')}
                  >Approve</button>
                  <button
                    className='px-2 py-0.5 bg-red-500 hover:bg-red-700 rounded-md'
                    onClick={() => changeStatus(leaves._id, 'Rejected')}
                  >Reject</button>
                </div>
              ) : <p className='font-medium'>{leaves.status}</p>}
            </div>
          </div>
        </div>
      </div>) : (<h2 className="text-xl font-semibold">Loading ....</h2>)
  )
}

export default Detail