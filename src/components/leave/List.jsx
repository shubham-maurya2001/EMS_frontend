import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { columns } from '../../utils/LeaveHelper'

const List = () => {
  const { user } = useAuth();
  const [leavedetails, setLeaveDatails] = useState([]);
  const [filteredLeave, setFilteredLeave] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const filterChange = (e) => {
    const records = leavedetails.filter((leave) => leave.status.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredLeave(records)
  }

  const fetchLeaveDetails = async (req, res) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
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
            leaveType: leave.leaveType,
            startDate: new Date(leave.startDate).toLocaleDateString(),
            endDate: new Date(leave.endDate).toLocaleDateString(),
            reason: leave.reason,
            appliedAt: new Date(leave.appliedAt).toLocaleDateString(),
            status: leave.status,
          }
        ));
        setLeaveDatails(data);
        setFilteredLeave(data);
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
    fetchLeaveDetails();
  }, [])

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
        <input type="text" placeholder='Search By Status' className='px-4 py-0.5 border mb-4 md:mb-0 md:mr-4 w-full md:w-auto' onChange={filterChange} />
        {
          user.role === 'employee' &&
          <Link to='/employee-dashboard/add-leave' className='px-4 py-1 bg-cyan-600 rounded-md text-white w-full md:w-auto text-center'>Apply For Leave</Link>
        }
      </div>
      <div className='mt-4 overflow-x-auto'>
        <DataTable
          columns={columns}
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

export default List
