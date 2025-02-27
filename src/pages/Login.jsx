import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://ems-server-drab.vercel.app/api/auth/login', { email, password });

            if (response.data.success) {
                setError(null)
                login(response.data.user)
                localStorage.setItem('token', response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard')
                }
                else {
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {

            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            }
            else {
                setError('Server Error')
            }
        }
    }
    return (
        <div className='flex flex-col items-center min-h-screen justify-center bg-gradient-to-b from-cyan-600 to-gray-100 p-4 sm:p-6 md:p-8 space-y-6'>
            <h2 className='font-play text-3xl text-white text-center'>Employee Management System</h2>
            <form className='bg-white p-6 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit}>
                <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                <div className='mb-4'>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input type="email" id="email" placeholder='Enter Email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'
                        autoComplete="email"
                        required />
                </div>
                <div className='mb-6'>
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type="password" id="password"
                        placeholder='******'
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'
                        autoComplete="current-password"
                        required
                    />
                </div>
                <div className='w-100 flex justify-between items-center mb-6'>
                    <Link to="/reset-password" className=' text-cyan-600 hover:underline'>Forgot password?</Link>
                </div>
                <button type="submit" className='w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition duration-300'>Login</button>
            </form>
        </div>
    )
}

export default Login
