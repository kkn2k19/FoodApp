import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        // <div>AdminDashboard</div>
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate("/admin/restaurants")}
                    className="p-6 bg-blue-500 text-white rounded-xl"
                >
                    Manage Restaurants
                </button>

                <button
                    onClick={() => navigate("/admin/foods")}
                    className="p-6 bg-green-500 text-white rounded-xl"
                >
                    Manage Foods
                </button>

                <button
                    onClick={() => navigate("/admin/orders")}
                    className="p-6 bg-purple-500 text-white rounded-xl"
                >
                    Manage Orders
                </button>
            </div>
        </div>
    )
}

export default AdminDashboard