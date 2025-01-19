import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/SalaryHelper';

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [salLoading, setSalLoading] = useState(false)
  const { id } = useParams();



  useEffect(() => {
    const fetchSalaries = async () => {
      setSalLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {

          let sno = 1;
          const data = await response.data.salary.map((sal) => (
            {
              _id: sal._id,
              sno: sno++,
              employeeId: sal.employeeId.employeeId,
              basicSalary: sal.basicSalary,
              allowances: sal.allowances,
              deductions: sal.deductions,
              netSalary: sal.netSalary,
              payDate: new Date(sal.payDate).toLocaleDateString(),
            }
          ));
          setSalaries(data)
          setFilteredSalaries(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setSalLoading(false)
      }
    }
    fetchSalaries()
  }, [])


  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) => leave.employeeId.ToLocateLowerCase().includes(q.ToLocateLowerCase()))
    setFilteredSalaries(filteredRecords)
  }
  return (
    // filteredSalaries ? (<div>
    //   view
    // </div>) : (<h2 className="text-xl font-semibold">Loading ....</h2>)
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold'>Salary History</h3>
      </div>
      <div className='flex justify-end items-center'>
        <input type="text" placeholder='Search By Employee ID' className='m-5 px-4 py-0.5 border' onChange={filterSalaries} />
        {/* <Link to='/admin-dashboard/add-employee' className='px-4 py-1 bg-cyan-600 rounded-md text-white'>Add New Employees</Link> */}
      </div>
      <div className='mt-4'>
        <DataTable
          columns={columns}
          data={filteredSalaries}
          pagination
          highlightOnHover
          striped
          noHeader
          progressPending={salLoading}
          progressComponent={<h2>Loading...</h2>}
        />
      </div>
    </div>
  )
}

export default View
