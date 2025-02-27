import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: '',
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // fetch departments  
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    }
    getDepartments();
  }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          const employee = response.data.employee
          setEmployee((prev) => ({ ...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus, designation: employee.designation, salary: employee.salary, department: employee.department }))
        }
      } catch (error) {
        if (error.resopnse && !error.response.data.success) {
          alert(error.resopnse.data.error)
        }
      }
    };
    fetchEmployee();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  return (
    departments && employee ? (
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input type="text" name='name' value={employee.name} onChange={handleChange} placeholder='Insert Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>

            {/* Marital Status */}
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
              <select name='maritalStatus' onChange={handleChange} value={employee.maritalStatus} placeholder="Marital Status" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            {/* Designation*/}
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>Designation</label>
              <input type="text" name='designation' onChange={handleChange}
                value={employee.designation}
                placeholder='Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required autoComplete='username' />
            </div>

            {/* Salary */}
            <div className='col-span-2 md:col-span-1'>
              <label className='block text-sm font-medium text-gray-700'>Salary</label>
              <input type="number" name='salary' onChange={handleChange}
                value={employee.salary}
                placeholder='Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>

            {/* Department */}
            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700'>Department</label>
              <select name='department' onChange={handleChange}
                value={employee.department.dep_name}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                <option key={employee.department._id} value={employee.department._id}>{employee.department.dep_name}</option>
                {/* department list */}
                {departments.map(dep => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}

              </select>
            </div>

          </div>
          {/* Submit Button */}
          <button type='submit' className='w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md'>Update</button>
        </form >
      </div >) : (<div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded mb-4 col-span-2"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded mt-6"></div>
        </div>
      </div>)
  )
}

export default Edit
