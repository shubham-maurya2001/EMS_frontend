import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: '$ NO',
        selector: (row) => row.sno,
        width: '70px',
        center: 'true'
    },
    {
        name: 'DEPARTMENT NAME',
        selector: (row) => row.dep_name,
        sortable: true,
        width: 100,
        center: 'true'
    },
    {
        name: 'ACTION',
        selector: (row) => row.action,
        center: true
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you want to delete this Department ?')
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }
    return (
        <div className="flex space-x-2">
            <button className="px-2 py-1 text-white bg-yellow-600 rounded-md"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-2 py-1 text-white bg-red-600 rounded-md"
                onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}