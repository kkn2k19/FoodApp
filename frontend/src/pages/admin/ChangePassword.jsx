import React, { useState } from 'react'
import api from '../../services/api'

const ChangePassword = () => {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        api.post("/api/auth/change-password", form)
            .then(() => {
                alert("Password changed successfully")
                setForm({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            })
            .catch(e => alert(e.response?.data || "failed to change password" ))
    }
    return (
        // <div>ChangePassword</div>
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-6 rounded-xl shadow w-96'
            >
                <h2 className='text-xl font-bold mb-4'>
                    Change Password
                </h2>

                <input
                    name='oldPassword'
                    type='password'
                    placeholder='Old Password'
                    value={form.oldPassword}
                    onChange={handleChange}
                    className='border p-2 w-full mb-3 rounded'
                />

                <input
                    name='newPassword'
                    type='password'
                    placeholder='New Password'
                    value={form.newPassword}
                    onChange={handleChange}
                    className='border p-2 w-full mb-3 rounded'
                />

                <input
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className='border p-2 w-full mb-3 rounded'
                />

                <button
                    className='w-full bg-green-500 text-white py-2 rounded'
                    type='submit'
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword