import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Setting = () => {
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched!")
    }
    else if (setting.newPassword === setting.oldPassword) {
      setError('Old Password and New Password must be different!')
    }
    else {
      try {
        const response = await axios.put('https://ems-server-drab.vercel.app/api/setting/change-password', setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          alert('Password Changed Successfully!')
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  }
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl fond-bold mb-6'>Change Password</h2>
      <p className='text-red-500 text-sm'>{error}</p>
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div>
          <label className='text-sm font-medium text-gray-700'>Old Password:</label>
          <input
            type="password"
            name='oldPassword'
            placeholder='Change Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className='text-sm font-medium text-gray-700'>New Password:</label>
          <input
            type="password"
            name='newPassword'
            placeholder='New Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className='text-sm font-medium text-gray-700'>Confirm Password:</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        {/* button */}
        <button type="submit"
          className='w-full mt-6 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md'>Change Password</button>

      </form>
    </div>
  )
}

export default Setting
