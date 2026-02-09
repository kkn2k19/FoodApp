// import React from 'react'
// import "./Food.css"
// import { Link } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
// import Nav from '../components/Navbar'
// function Food() {
//     return (
//         <div>
//             <div>
//                 <Nav/>
//             </div>

//             <div className='container'>
//                 <div className='leftContainer'>
//                     <Link to="add" >ADD FOOD</Link>
//                     <Link to="update" >UPDATE FOOD</Link>
//                     <Link to="delete" >DELETE FOOD</Link>
//                 </div>
//                 <div className='rightContainer'>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Food


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const FoodDetails = () => {
    const [food, setFood] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [cart, setCart] = useState([]);

    useEffect(() => {
        api.get(`/api/foods/${id}`)
            .then(res => {
                setFood(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert("Food not found");
                setLoading(false);
            })

        if (localStorage.getItem("token")) {
            api.get("/api/cart")
                .then(res => setCart(Array.isArray(res.data) ? res.data : []))
                .catch(() => setCart([]));
        }

    }, [id]);

    const addToCart = () => {
        api.post(`/api/cart/add/${id}?quantity=1`)
            .then((res) => {
                alert(res.data)
                return api.get('/api/cart')
            })
            .then(res => setCart(Array.isArray(res.data) ? res.data : []))
            .catch(e => alert(e.response?.data || "Login Required"));
    }

    if (loading) return <div className='text-center mt-10'>Loading...</div>;
    if (!food) return null;

    return (
        // <div>FoodDetails</div>
        <div className='min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6 justify-center'>
            <div className='bg-white shadow-lg rounded-xl max-w-3xl w-full p-6'>
                <img
                    src={food.imageUrl}
                    alt={food.name}
                    className='w-full h-64 object-cover rounded-lg mb-4'
                />
                <h1 className='text-2xl font-bold mb-2'>{food.name}</h1>
                <p className='text-gray-600 mb-3'>{food.description}</p>
                <div className='flex justify-between items-center mb-3'>
                    <span className='text-lg font-semibold text-green-600'>
                        Rs. {food.price}
                    </span>
                    <span className='text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full'>
                        {food.category}
                    </span>
                </div>
                <p className='text-sm text-gray-500 mb-6 hover:text-blue-700 cursor-pointer' onClick={() => {
                    navigate(`/restaurants/${food.restaurantId}`)
                }}>
                    Restaurant: <span>{food.restaurantName}</span>
                </p>
                {role !== "ADMIN" && (
                    <button
                        onClick={addToCart}
                        className='w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg'>
                        Add to Cart 🛒
                    </button>
                )}
            </div>

            {/* CART SIDEBAR */}
            {role !== "ADMIN" && (
                < div className="w-full lg:w-80 bg-white p-4 rounded-xl shadow h-fit">
                    <h3 className="font-semibold mb-3">Your Cart</h3>

                    {cart.length === 0 ? (
                        <p className="text-sm text-gray-500">Cart is empty</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm mb-2">
                                <span>{item.foodName}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        ))
                    )}
                </div>
            )
            }


        </div >
    )
}

export default FoodDetails