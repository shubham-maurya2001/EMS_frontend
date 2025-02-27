import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/AttendanceHelper';

const AttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [dateFilter, setDateFilter] = useState()
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false)

  const filterAttendence = (e) => {
    setDateFilter(e.target.value);
    setSkip(0);
  }
  var date = new Date().toISOString().split('T')[0]
  if (dateFilter) {
    date = dateFilter
  }

  const fetchReport = async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({ limit, skip })
      if (dateFilter) {
        query.append('date', dateFilter)
      }
      const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if (response.data.success) {
        var data;
        if (response.data.groupData[date] != undefined) {
          let sno = 1;
          data = await response.data.groupData[date].map((emp) => (
            {
              enployeeId: emp.employeeId,
              sno: sno++,
              dep_name: emp.departmentName,
              name: emp.employeeName,
              status: emp.status
            }
          ));
        }
        if (skip == 0) {
          setReport(data);
        }
        else {
          setReport((prevData) => ({ ...prevData, ...data }))
        }
      }
    }
    catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchReport()
  }, [dateFilter])


  return (
    <div className='p-6'>
      <h2 className='text-center text-2xl font-bold p-2'>Attendance Report</h2>
      <p className='flex justify-center text-xl mt-3'>
        <span className='font-bold'>Date: <span className='underline'> {date}</span></span>
      </p>
      <div className='p-4'>
        <label className='text-xl font-semibold p-2'>Filter by Date</label>
        <input type="date" className='border bg-gray-300 pl-2 pr-2'
          onChange={filterAttendence} />
      </div>
      <div className='mt-4 overflow-x-auto'>
        <DataTable
          columns={columns}
          data={report}
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

export default AttendanceReport
