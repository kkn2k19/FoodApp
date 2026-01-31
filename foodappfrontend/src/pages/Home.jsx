// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// function Home() {
//     var navigate = useNavigate();
//     return (
//         <div>
//             <h2 className='text-primary' >Food App System</h2>
//             <img src='https://images01.nicepagecdn.com/page/67/56/homepage-design-preview-67567.jpg' height={500} width={1300} alt='#' /> <br /> <br />
//             <button className='btn btn-outline-success' onClick={() => {
//                 navigate("/register");
//             }} >Register</button> &nbsp; &nbsp;
//             <button className='btn btn-outline-secondary' onClick={() => {
//                 navigate("/login");
//             }}>Login</button>
//         </div>
//     )
// }

// export default Home


import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        api.get("/api/foods")
            .then(res => setFoods(res.data))
            .catch(e => console.error(e));
    }, []);

    return (
        // <div>Home</div>
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[80vh] overflow-y-auto'>

                {/* <div>
                <Navbar/>
            </div> */}

                {foods.map(food => (
                    <div key={food.id}
                        className='bg-white shadow-md rounded-lg hover:shadow-xl transition flex flex-col'
                    >
                        <img
                            src={food.imageUrl || "/default-image.jpg"}
                            alt={food.name}
                            className='w-full h-40 p-2 object-cover rounded-2xl'
                        />
                        <div className='flex flex-col flex-grow p-4'>
                            <h2 className='font-semibold text-lg min-h-[30px]'>
                                {food.name}
                            </h2>
                            <p className='text-sm text-orange-600 mb-2'>
                                {food.restaurantName}
                            </p>
                            {/* <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {food.description}
                            </p> */}
                            <p className="text-xs text-gray-600 mb-2">
                                {food.description?.substring(0, 60)}...
                            </p>
                            <div className='mt-auto'>
                                <p className='font-bold text-md mb-2'>
                                    Rs.{food.price}
                                </p>

                                <button
                                    className='w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600'
                                    onClick={() => {
                                        if (!localStorage.getItem("token")) {
                                            navigate("/login");
                                        } else {
                                            alert("Added to cart ");
                                        }
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home