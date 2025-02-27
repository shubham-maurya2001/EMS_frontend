import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null)

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        setEmployee(response.data.employee)
      }
    } catch (error) {
      if (error.resopnse && !error.response.data.success) {
        alert(error.resopnse.data.error)
      }
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [])

  return (
    employee ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='flex justify-center'>
            <img className="rounded-full border w-72" src={`${employee.userId.profileImageUrl}`} alt="" />
          </div>
          <div>
            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Name:</p>
              <p className='font-medium'>{employee.userId.name}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Employee ID:</p>
              <p className='font-medium'>{employee.employeeId}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Date of Birth:</p>
              <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Gender:</p>
              <p className='font-medium'>{employee.gender}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Department:</p>
              <p className='font-medium'>{employee.department.dep_name}</p>
            </div>
            <div className="flex justify-center space-x-3 mb-5">
              <p className="text-md font-bold">Marital Status:</p>
              <p className='font-medium'>{employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>) : (<div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
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
      </div>)
  )
}

export default View