import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/api/orders")
            .then(res => setOrders(res.data))
            .catch(() => alert("Failed to load orders"));
    }, []);

    return (
        // <div>Orders</div>
        <div className='min-h-screen bg-gray-100 p-6'>
            <h1 className='text-2xl font-bold mb-6'>
                {role === "ADMIN" ? "All Users Orders 📦" : "My Orders 📦"}
            </h1>

            {orders.length === 0 ? (
                <p className='text-gray-500'>No orders found.</p>
            ) : (
                <div className='space-y-4'>
                    {orders.map(order => (
                        <div key={order.orderId}
                            className='bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow transition'
                            onClick={() => navigate(`/orders/${order.orderId}`)}>
                            <div className='flex justify-between items-center '>
                                <h2 className='font-semibold' >
                                    Order #{order.orderId}
                                </h2>

                                <span className={`text-sm px-3 py-1 rounded-full ${order.status === "PENDING" ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "DELIVERED"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <p className='text-sm text-gray-500'>
                                {new Date(order.orderDate).toLocaleString()}
                            </p>
                            <p className='font-bold mt-2'>
                                Total: Rs.{order.totalAmount}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders