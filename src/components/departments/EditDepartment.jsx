import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`https://ems-server-rust.vercel.app/api/department/${id}`, department, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(`https://ems-server-rust.vercel.app/api/department/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.resopnse && !error.response.data.success) {
                    alert(error.resopnse.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartments();
    }, [])
    return (
        <>{depLoading ? <h2 className='text-xl font-semibold'>Loading ....</h2> :
            <div className="flex justify-center items-center h-screen-minus-12 bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h3 className="text-xl font-bold mb-4">Update Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="dep_name" className="block text-gray-700">Department Name</label>
                            <input type="text" id="dep_name" name='dep_name' onChange={handleChange} value={department.dep_name} placeholder='Enter Dep Name' className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <textarea name="description" onChange={handleChange} value={department.description} placeholder='description' className="mt-1 p-2 w-full border rounded" />
                        </div>
                        <button className="bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700">Update</button>
                    </form>
                </div>
            </div>
        }</>
    )
}

export default EditDepartment
