import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    useEffect(() => {
        api.get(`/api/restaurants/${id}`)
            .then(res => setRestaurant(res.data))
        // .catch(e => console.error(e));

        api.get(`/api/foods/restaurant/${id}`)
            .then(res => setFoods(res.data));
    }, [id]);

    const addToCart = (foodId) => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        api.post(`/api/cart/add/${foodId}?quantity=1`)
            .then((res) => { alert(res.data) })
            .catch(err => {
                alert(err.response?.data || "Error adding to cart");
            });
    }

    if (!restaurant) {
        return <div className='p-6'>Loading...</div>;
    }
    return (
        // <div>RestaurantDetails</div>
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h1 className='text-3xl font-bold'>{restaurant.name}</h1>
            <p className='text-gray-600 mb-4'>{restaurant.phone}</p>
            <p className='text-gray-600 mb-4'>{restaurant.city}, {restaurant.state}</p>

            <h2 className='text-xl font-semibold mb-4'>Menu</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {foods.map(food => (
                    <div key={food.id} className='bg-white shadow rounded-lg p-4 flex gap-4'>
                        <img
                            src={food.imageUrl}
                            alt={food.name}
                            className='w-24 h-24 object-cover rounded cursor-pointer'
                            onClick={() => navigate(`/food/${food.id}`)}
                        />
                        <div className='flex flex-col flex-grow'>
                            <h3
                                onClick={() => navigate(`/food/${food.id}`)}
                                className='font-semibold cursor-pointer hover:text-orange-600'
                            >
                                {food.name}
                            </h3>

                            <p className='text-sm text-gray-500 line-clamp-2'> {food.description}</p>
                            <p className='font-bold mt-2'>Rs.{food.price}</p>

                            {role !== "ADMIN" && (
                                <button onClick={() => addToCart(food.id)}
                                    className='wt-auto bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600'
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantDetails