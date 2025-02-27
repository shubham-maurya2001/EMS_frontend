import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AttendanceButtons, column } from '../../utils/AttendanceHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [Loading, setLoading] = useState(false)
  const [filteredAttendance, setFilteredAttendance] = useState([])

  const statusChange = () => {
    fetchAttendance()
  }
  const fetchAttendance = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://ems-server-drab.vercel.app/api/attendance', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((att) => (
          {
            enployeeId: att.employeeId.employeeId,
            sno: sno++,
            dep_name: att.employeeId.department.dep_name,
            name: att.employeeId.userId.name,
            action: (<AttendanceButtons status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />),
          }
        ));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      if (error.resopnse && !error.response.data.success) {
        alert(error.resopnse.data.error)
      }
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, [])

  const filterAttendance = (e) => {
    const records = attendance.filter((att) => att.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredAttendance(records)
  }
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold'>Manage Attendance</h3>
      </div>
      <p className='flex justify-center text-xl mt-3'>
        <span className='font-bold'>Date: <span className='underline'> {new Date().toISOString().split('T')[0]}</span></span>
      </p>
      <div className='flex flex-col md:flex-row justify-between items-center mt-4'>
        <input
          type="text"
          placeholder='Search By Name'
          className='px-4 py-0.5 border mb-4 md:mb-0 md:mr-4 w-full md:w-auto'
          onChange={filterAttendance}
        />
        <Link
          to='/admin-dashboard/attendance-report'
          className='px-4 py-1 bg-cyan-600 rounded-md text-white w-full md:w-auto text-center'
        >
          Attendance Report
        </Link>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <DataTable
          columns={column}
          data={filteredAttendance}
          pagination
          highlightOnHover
          striped
          noHeader
          progressPending={Loading}
          progressComponent={<h2>Loading...</h2>}
        />
      </div>
    </div>
  )
}

export default Attendance
