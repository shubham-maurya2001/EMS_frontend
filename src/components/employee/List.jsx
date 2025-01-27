import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployee] = useState([])

  const fetchEmployees = async () => {
    setEmpLoading(true)
    try {
      const response = await axios.get('https://ems-server-drab.vercel.app/api/employee', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.employees.map((emp) => (
          {
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img width={40} className=' p-1 rounded-full' src={`${emp.userId.profileImageUrl}`} alt="" />,
            action: (<EmployeeButtons _id={emp._id} />),
          }
        ));
        setEmployees(data);
        setFilteredEmployee(data);
      }
    } catch (error) {
      if (error.resopnse && !error.response.data.success) {
        alert(error.resopnse.data.error)
      }
    } finally {
      setEmpLoading(false)
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [])

  const filterEmployees = (e) => {
    const records = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredEmployee(records)
  }
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
        <input
          type="text"
          placeholder='Search By Name'
          className='px-4 py-0.5 border mb-4 md:mb-0 md:mr-4 w-full md:w-auto'
          onChange={filterEmployees}
        />
        <Link
          to='/admin-dashboard/add-employee'
          className='px-4 py-1 bg-cyan-600 rounded-md text-white w-full md:w-auto text-center'
        >
          Add New Employees
        </Link>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          highlightOnHover
          striped
          noHeader
          progressPending={empLoading}
          progressComponent={<h2>Loading...</h2>}
        />
      </div>
    </div>
  )
}

export default List
