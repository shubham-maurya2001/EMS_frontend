import axios from "axios"

export const column = [
  {
    name: '$ NO',
    selector: (row) => row.sno,
    width: '70px',
    center: 'true'
  },
  {
    name: 'NAME',
    selector: (row) => row.name,
    sortable: true,
    width: '100px',
    center: 'true'
  },
  {
    name: 'EMP ID',
    selector: (row) => row.enployeeId,
    sortable: true,
    width: '120px',
    center: 'true'
  },
  {
    name: 'DEPARTMENT',
    selector: (row) => row.dep_name,
    width: '190px',
    center: 'true'
  },
  {
    name: 'ACTION',
    selector: (row) => row.action,
    center: 'true'
  },
]




export const columns = [
  {
    name: '$ NO',
    selector: (row) => row.sno,
    width: '70px',
    center: 'true'
  },
  {
    name: 'NAME',
    selector: (row) => row.name,
    sortable: true,
    width: '100px',
    center: 'true'
  },
  {
    name: 'EMP ID',
    selector: (row) => row.enployeeId,
    sortable: true,
    width: '120px',
    center: 'true'
  },
  {
    name: 'DEPARTMENT',
    selector: (row) => row.dep_name,
    width: '190px',
    center: 'true'
  },
  {
    name: 'STATUS',
    selector: (row) => row.status,
    center: 'true'
  },
]

export const AttendanceButtons = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    const response = await axios.put(`https://ems-server-drab.vercel.app/api/attendance/update/${employeeId}`, { status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (response.data.success) {
      statusChange()
    }
  }
  return (
    <>
      {status == null ?
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-white bg-green-600 rounded-md"
            onClick={() => markEmployee("Present", employeeId)}>Present</button>
          <button className="px-2 py-1 text-white bg-red-600 rounded-md"
            onClick={() => markEmployee("Absent", employeeId)}>Absent</button>
          <button className="px-2 py-1 text-white bg-yellow-600 rounded-md"
            onClick={() => markEmployee("Sick", employeeId)}>Sick</button>
          <button className="px-2 py-1 text-white bg-cyan-600 rounded-md"
            onClick={() => markEmployee("Leave", employeeId)}>Leave</button>
        </div> :
        <button className="px-2 py-1 text-white bg-gray-600 rounded-md">{status}</button>
      }
    </>
  )
}