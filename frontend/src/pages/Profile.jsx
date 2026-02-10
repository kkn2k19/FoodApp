import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/auth/me")
            .then(res => setProfile(res.data))
            .catch(() => alert("Failed to load profile"))
    }, [])

    if (!profile) return <div className='p-6'>Loading...</div>

    return (
        // <div>Profile</div>
        <div className='min-h-screen bg-gray-100 p-6'>
            <div className='max-w-xl mx-auto bg-white rounded-xl shadow p-6'>
                <h1 className='text-2xl font-bold mb-4'>My Profile</h1>

                <div className='space-y-2 text-sm' >
                    <p><b>Name:</b> {profile.name}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    <p><b>Phone:</b> {profile.phone}</p>
                    <p><b>Role:</b> {profile.role}</p>
                    <p><b>City:</b> {profile.city}</p>
                    <p><b>State:</b> {profile.state}</p>
                    <p><b>Pincode:</b> {profile.pincode}</p>
                </div>

                {role === "ADMIN" && (
                    <div className='mt-6 p-4 bg-orange-50 rounded'>
                        <h2 className='font-semibold mb-2'>Admin Capabilities</h2>
                        <ul className='text-sm list-disc ml-5'>
                            <li>Manage Restaurants</li>
                            <li>Manage Foods</li>
                            <li>Manage Orders</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="mt-4 flex gap-3">
                <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit Profile
                </button>

                <button
                    onClick={() => navigate("/change-password")}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Change Password
                </button>
            </div>

        </div>
    )
}

export default Profile