import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LeaveButtons, leaveColumns } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [filteredLeave, setFilteredLeave] = useState([])
  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => (
          {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days: (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24),
            status: leave.status,
            action: (<LeaveButtons Id={leave._id} />),
          }
        ));
        setLeaves(data)
        setFilteredLeave(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchLeaves()
  }, [])
  const filterChange = (e) => {
    const records = leaves.filter((leave) => leave.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredLeave(records)
  }
  const filterByButton = (status) => {
    const records = leaves.filter((leave) => leave.status === status);
    setFilteredLeave(records)
  }

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
        <input type="text" placeholder='Search By Name' className='px-4 py-0.5 border mb-4 md:mb-0 md:mr-4 w-full md:w-auto' onChange={filterChange} />
        <div className='space-x-3'>
          <button
            className='hidden md:inline px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-700 rounded-md mb-2'
            onClick={() => filterByButton('Pending')}
          >Pending</button>
          <button
            className='hidden md:inline px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-700 rounded-md mb-2'
            onClick={() => filterByButton('Approved')}
          >Approved</button>
          <button
            className='hidden md:inline px-2 py-1 bg-cyan-500 text-white hover:bg-cyan-700 rounded-md mb-2'
            onClick={() => filterByButton('Rejected')}
          >Rejected</button>
        </div>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <DataTable
          columns={leaveColumns}
          data={filteredLeave}
          pagination
          highlightOnHover
          striped
          noHeader
          progressPending={loading}
          progressComponent={<h2>Loading...</h2>}
        />
      </div>
    </div>
  )
}

export default Table
