import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    name: 'IMAGE',
    selector: (row) => row.profileImage,
    width: '70px',
    center: 'true'
  },
  {
    name: 'DEPARTMENT',
    selector: (row) => row.dep_name,
    width: '120px',
    center: 'true'
  },
  {
    name: 'DOB',
    selector: (row) => row.dob,
    sortable: true,
    width: '100px',
    center: 'true'
  },
  {
    name: 'ACTION',
    selector: (row) => row.action,
    center: 'true'
  },
]


export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.resopnse && !error.response.data.success) {
      alert(error.resopnse.data.error)
    }
  }
  return departments;
};

// employees for salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.resopnse && !error.response.data.success) {
      alert(error.resopnse.data.error)
    }
  }
  return employees;
};




export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate()
  return (
    <div className="flex space-x-2">
      <button className="px-2 py-1 text-white bg-cyan-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >View</button>
      <button className="px-2 py-1 text-white bg-yellow-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >Edit</button>
      <button className="px-2 py-1 text-white bg-green-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >Salary</button>
      <button className="px-2 py-1 text-white bg-red-600 rounded-md"
        onClick={() => navigate(`/admin-dashboard/employees/leave/${_id}`)}
      >Leave</button>
    </div>
  )
}
