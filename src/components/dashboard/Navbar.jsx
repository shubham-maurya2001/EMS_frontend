import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center justify-between text-white h-12 bg-cyan-600 px-2'>
            <p className='text-sm md:text-lg'>Welcome {user.name}</p>
            <button className='px-2 py-1 bg-cyan-800 rounded-md hover:bg-cyan-900 md:px-4' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
