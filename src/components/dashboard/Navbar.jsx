import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center justify-between text-white h-12 bg-cyan-600 px-2'>
            <p>Welcome {user.name}</p>
            <button className='px-4 py-1 bg-cyan-800 rounded-md hover:bg-cyan-900' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar
