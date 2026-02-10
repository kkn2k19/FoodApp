import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const OrdersDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => {
        alert(err.response?.data || "Unable to load order")
        navigate("/orders");
      })
  }, [id, navigate]);

  const cancelOrder = () => {
    api.delete(`/api/orders/${id}`)
      .then(() => {
        alert("Order cancelled");
        navigate("/orders");
      })
      .catch(err =>
        alert(err.response?.data || "cannot cancel order")
      )
  }

  const updateStatus = (status) => {
    api.patch(`/api/orders/${id}/status?status=${status}`)
      .then(() => {
        alert("order status updated");
        setOrder({
          ...order,
          status
        })
      })
      .catch(e =>
        alert(e.response?.data || "Failed to update status")
      )
  }

  if (!order) {
    return <div className='p-6'>Loading...</div>
  }

  return (
    // <div>OrdersDetails</div>
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow p-6'>


        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold'>
            Order #{order.orderId}
          </h1>

          <span
            className={`px-3 py-1 rounded-full text-sm ${order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "DELIVERED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {order.status}
          </span>
        </div>

        <p className='text-sm text-gray-500 mb-6'>
          Placed on {new Date(order.orderDate).toLocaleString()}
        </p>


        <div className='space-y-2 mb-6'>
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className='flex justify-between border-b pb-2 text-sm'
            >
              <span>
                {item.foodName} * {item.quantity}
              </span>
              <span>Rs.{item.price}</span>
            </div>
          ))}
        </div>


        <div className='flex justify-between font-bold text-lg mb-6'>
          <span>Total</span>
          <span>Rs. {order.totalAmount}</span>
        </div>


        {role === "USER" && order.status === "PENDING" && (
          <button
            onClick={cancelOrder}
            className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600'
          >
            Cancel Order
          </button>
        )}

        {role === "ADMIN" && (
          <div className='mt-4'>
            <label className='block text-sm mb-1'>
              Update Order Status
            </label>
            <select value={order.status}
              className='w-full border px-3 py-2 rounded-lg'
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersDetails