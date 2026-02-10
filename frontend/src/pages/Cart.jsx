// import React, { useEffect, useState } from 'react'
// import api from '../services/api'
// import { useNavigate } from 'react-router-dom'

// const Cart = () => {
//     const navigate = useNavigate();
//     const [cart, setCart] = useState([]);

//     const fetchCart = () => {
//         api.get("/api/cart")
//             .then(res => {
//                 if (Array.isArray(res.data)) {
//                     setCart(res.data);
//                 } else {
//                     setCart([]);
//                 }
//             })
//             .catch(e => {
//                 console.error("Error fetching cart:", e);
//                 setCart([]);
//             })
//     }

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     const updateQty = (cartItemId, quantity) => {
//         if (quantity < 1) return;
//         api.put(`/api/cart/update/${cartItemId}?quantity=${quantity}`)
//             .then(fetchCart)
//             .catch(e => alert(e.response?.data || "Error updating cart"))
//     }

//     const removeItem = (cartItemId) => {
//         api.delete(`/api/cart/remove/${cartItemId}`)
//             .then(fetchCart)
//             .catch(e => alert(e.response?.data || "Error removing item"))
//     }

//     const placeOrder = () => {
//         api.post("/api/orders/place")
//             .then(() => {
//                 alert("Order placed successfully");
//                 navigate("/orders");
//             })
//             .catch(e => alert(e.response?.data || "Error placing order"))
//     }

//     const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

//     return (
//         // <div>Cart</div>
//         <div className='min-h-screen bg-gray-100 p-6'>
//             <h1 className='text-2xl font-bold mb-6'>My Cart 🛒</h1>

//             {cart.length === 0 ? (
//                 <div className='text-gray-600'>Your cart is empty.</div>
//             ) : (
//                 <div className='grid gap-4' >
//                     {cart.map(item => (
//                         <div key={item.foodId} className='bg-white p-4 rounded-lg shadow flex justify-between items-center'>
//                             <div>
//                                 <h2 className='font-semibold'>{item.foodName}</h2>
//                                 <p className='text-sm text-gray-500'>{item.restaurantName}</p>
//                                 <p className='text-sm font-medium'>Rs.{item.price}</p>
//                             </div>

//                             <div className='flex items-center gap-2'>
//                                 <button
//                                     onClick={() => updateQty(item.id, item.quantity - 1)}
//                                     className='px-2 py-1 bg-gray-200 rounded'
//                                 >-</button>
//                                 <span>{item.quantity}</span>
//                                 <button
//                                     onClick={() => updateQty(item.id, item.quantity + 1)}
//                                     className='px-2 py-1 bg-gray-200 rounded'
//                                 >+</button>
//                             </div>
//                             <button
//                                 onClick={() => removeItem(item.id)}
//                                 className='text-red-500 hover:underline'
//                             > Remove</button>
//                         </div>
//                     ))}

//                     <div className='bg-white p-4 rpunded-lg shadow mt-4 flex justify-between items-center'>
//                         <h2 className='text-lg font-bold'>Total: Rs.{total}</h2>
//                         <button
//                             onClick={placeOrder}
//                             className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700'
//                         >Place Order</button>
//                     </div>
//                 </div>
//             )
//             }
//         </div >
//     )
// }

// export default Cart


import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    api.get("/api/cart")
      .then(res => {
        setCart(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setCart([]));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = (cartItemId, quantity) => {
    if (quantity < 1) return;
    api.put(`/api/cart/update/${cartItemId}?quantity=${quantity}`)
      .then(fetchCart)
      .catch(e => alert(e.response?.data || "Error updating cart"));
  };

  const removeItem = (cartItemId) => {
    api.delete(`/api/cart/remove/${cartItemId}`)
      .then(fetchCart)
      .catch(e => alert(e.response?.data || "Error removing item"));
  };

  const placeOrder = () => {
    api.post("/api/orders/place")
      .then(() => {
        alert("Order placed successfully");
        navigate("/orders");
      })
      .catch(e => alert(e.response?.data || "Error placing order"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{item.foodName}</h2>
                  <p className="text-sm text-gray-500">
                    {item.restaurantName}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
