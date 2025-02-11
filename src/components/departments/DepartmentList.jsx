import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {
	const [departments, setDepartments] = useState([])
	const [depLoading, setDepLoading] = useState(false)
	const [filteredDepartments, setFilteredDepartments] = useState([])
	const onDepartmentDelete = () => {
		fetchDepartments()
	}

	const fetchDepartments = async () => {
		setDepLoading(true)
		try {
			const response = await axios.get('https://ems-server-drab.vercel.app/api/department', {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			if (response.data.success) {
				let sno = 1;
				const data = await response.data.departments.map((dep) => (
					{
						_id: dep._id,
						sno: sno++,
						dep_name: dep.dep_name,
						action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
					}
				))
				setDepartments(data);
				setFilteredDepartments(data)
			}
		} catch (error) {
			if (error.resopnse && !error.response.data.success) {
				alert(error.resopnse.data.error)
			}
		} finally {
			setDepLoading(false)
		}
	};

	useEffect(() => {
		fetchDepartments();
	}, [])

	const filterDepartments = (e) => {
		const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
		setFilteredDepartments(records)
	}
	return (
		<div className='p-5'>
			<div className='text-center'>
				<h3 className='text-3xl font-bold'>Manage Departments</h3>
			</div>
			<div className='flex flex-col md:flex-row justify-between items-center mt-4'>
				<input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5 border mb-2 md:mb-0 md:mr-2 w-full md:w-auto' onChange={filterDepartments} />
				<Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-cyan-600 rounded-md text-white w-full md:w-auto text-center'>Add New Department</Link>
			</div>
			<div className='mt-5 overflow-x-auto'>
				<DataTable
					columns={columns}
					data={filteredDepartments}
					pagination
					highlightOnHover
					striped
					noHeader
					progressPending={depLoading}
					progressComponent={<h2>Loading...</h2>}
				/>
			</div>
		</div>
	)
}

export default DepartmentList
