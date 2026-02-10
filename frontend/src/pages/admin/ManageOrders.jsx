import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        api.get("/api/orders")
            .then(res => setOrders(res.data))
            .catch(e => alert(e.response?.data || "Failed to load orders"))
    };

    const updateStatus = (id, status) => {
        api.patch(`/api/orders/${id}/status?status=${status}`)
            .then(() => {
                alert("Order status updated");
                loadOrders();
            })
            .catch(e => alert(e.response?.data || "update failed"));
    }



    return (
        // <div>ManageOrders</div>
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-6'>
                Manage Orders
            </h1>

            {orders.length === 0 ? (
                <p>No Orders found</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {orders.map(o => (
                        <div
                            key={o.orderId}
                            className='bg-white p-5 rounded shadow'
                        >
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className='font-semibold'>
                                    Order #{o.orderId}
                                </h2>

                                <span className={`px-3 py-1 rounded-full text-sm
                                    ${o.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                                    ${o.status === "CONFIRMED" && "bg-blue-100 text-blue-700"}
                                    ${o.status === "OUT_FOR_DELIVERY" && "bg-purple-100 text-purple-700"}
                                    ${o.status === "DELIVERED" && "bg-green-100 text-green-700"}
                                    ${o.status === "CANCELLED" && "bg-red-100 text-red-700"}
                                    `}>
                                    {o.status}
                                </span>
                            </div>

                            <p className='text-sm text-gray-500'>
                                {new Date(o.orderDate).toLocaleString()}
                            </p>
                            <p className='font-bold mt-2'>
                                Total: Rs.{o.totalAmount}
                            </p>

                            <select
                                value={o.status}
                                onChange={(e) =>
                                    updateStatus(o.orderId, e.target.value)
                                }
                                className='border p-2 rounded w-full mt-3'
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                                <option value="DELIVERED">DELIVERED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>


                            <button
                                onClick={() => navigate(`/orders/${o.orderId}`)}
                                className='mt-3 w-full bg-blue-500 text-white py-2 rounded'
                            >
                                View Details
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ManageOrders