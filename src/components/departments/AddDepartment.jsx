import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: '',
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://ems-server-drab.vercel.app/api/department/add', department, {
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
    return (
        <div className="flex justify-center items-center h-screen-minus-12">
            <div className="bg-gray-300 p-8 rounded shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Add New Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="dep_name" className="block text-gray-700">Department Name</label>
                        <input type="text" id="dep_name" name='dep_name' onChange={handleChange} placeholder='Enter Dep Name' className="mt-1 p-2 w-full border rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea name="description" onChange={handleChange} placeholder='description' className="mt-1 p-2 w-full border rounded" />
                    </div>
                    <button className="bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700">Add Department</button>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment
