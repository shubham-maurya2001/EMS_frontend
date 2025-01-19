import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: '$ NO',
        selector: (row) => row.sno
    },
    {
        name: 'DEPARTMENT NAME',
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: 'ACTION',
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you want to delete this Department ?')
        if (confirm) {
            try {
                const response = await axios.delete(`https://ems-server-rust.vercel.app/api/department/${id}`, {
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
        <div className="flex space-x-3">
            <button className="px-3 py-1 text-white bg-cyan-600 rounded-md"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 text-white bg-red-600 rounded-md"
                onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}