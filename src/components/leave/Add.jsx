import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [leave, setLeave] = useState({
    userId: user._id
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ems-server-drab.vercel.app/api/leave/add', leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`)
      }
    } catch (error) {

    }
  }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            >
              <option value="">Select Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* from Date */}
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>From Date</label>
              <input
                type="date"
                name='startDate'
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              />
            </div>
            {/* to Date */}
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>To Date</label>
              <input
                type="date"
                name='endDate'
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                required
              />
            </div>
            {/* Deasciption */}
            <div className='col-span-2'>
              <label className='bloack text-sm font-medium text-gray-700'>Description</label>
              <textarea
                name='reason'
                placeholder='Reason'
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              ></textarea>
            </div>
          </div>

          {/* button */}
          <button
            type='submit'
            className='w-full mt-6 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md'
          >Apply For Leave</button>
        </div>
      </form>
    </div>
  )
}

export default Add
