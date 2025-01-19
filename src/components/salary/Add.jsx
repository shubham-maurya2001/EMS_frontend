import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
  const [salary, satSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch departments  
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    }
    getDepartments();
  }, [])


  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    satSalary((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://ems-server-rust.vercel.app/api/salary/add`, salary, {
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
    departments ? (
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
        <form onSubmit={handleSubmit}>


          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Department */}
            <div >
              <label className='block text-sm font-medium text-gray-700'>Department</label>
              <select name='department' onChange={handleDepartment}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                <option value="">Select Department</option>
                {/* department list */}
                {departments.map(dep => (
                  <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}

              </select>
            </div>

            {/* Employee */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Employee</label>
              <select name='employeeId' onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                <option value="">Select Employee</option>
                {/* employee list */}
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                ))}

              </select>
            </div>


            {/* Basic Salary*/}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Basic Salary</label>
              <input type="number" name='basicSalary' onChange={handleChange}
                placeholder='Basic Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required autoComplete='username' />
            </div>

            {/* Allowances */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Allowances</label>
              <input type="number" name='allowances' onChange={handleChange}
                placeholder='Allowances' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>

            {/* Deductions */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Deductions</label>
              <input type="number" name='deductions' onChange={handleChange}
                placeholder='Deductions' className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>

            {/* Pay Date */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Pay Date</label>
              <input type="date" name='payDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>



          </div>
          {/* Submit Button */}
          <button type='submit' className='w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md'>Add Salary</button>
        </form >
      </div >) : (<h2 className='text-xl font-semibold'>Loading...</h2>)
  )
}

export default Add
