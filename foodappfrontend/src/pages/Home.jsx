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
        <div>
            {foods.map(food => (
                <div key={food.id}>
                    <img src={food.imageUrl || "/default-image.jpg"} alt={food.name} />
                    <h2>{food.name}</h2>
                    <p>{food.restaurantName}</p>
                    <p>Rs.{food.price}</p>

                    <button onClick={() => {
                        if (!localStorage.getItem("token")) {
                            navigate("/login");
                        } else {
                            alert("Added to cart");
                        }
                    }}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home