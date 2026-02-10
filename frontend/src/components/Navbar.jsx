// import React from 'react'
// import "./Nav.css"
// // import { useNavigate } from 'react-router-dom'
// function Nav() {
//     // var navigate = useNavigate();
//     return (
//         <div className='container' >
//             <div className='leftContainer'>
//                 <h2>FoodApp Admin</h2>
//                 {/* <h2 style={{ cursor: "pointer", color: "yellow" }} onClick={() => navigate("/")}>FoodApp Admin</h2> */}
//             </div>
//             <div className='rightContainer'>
//                 <a href="/food">FOOD</a>
//                 <a href="/flist">FOODLIST</a>
//                 <a href="/sfood">SEARCH FOOD</a>
//                 <a href="/contact">CONTACT US</a>
//             </div>
//         </div>
//     )
// }

// export default Nav

import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api';

function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        if (!token) return;
        api.get("/api/auth/me")
            .then(res => setProfile(res.data))
            .catch(() => setProfile(null))
    }, [token])


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setProfile(null)
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        // <div>Navbar</div>
        <div className='flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50 '>
            <h1 className='text-2xl font-bold text-orange-600 cursor-pointer' onClick={() => {
                navigate("/");
            }}>FoodApp</h1>
            {!token ? (
                <div className='space-x-2 text-gray-700 font-medium'>
                    <Link to="/login" className='hover:text-orange-600'>Login</Link>
                    <span>||</span>
                    <Link to="/register" className='hover:text-orange-600'>Register</Link>
                </div>
            ) : (
                // <Link to="/profile">
                //     <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                // </Link>

                <div className='relative' ref={dropdownRef}>
                    <div
                        onClick={() => setOpen(!open)}
                        className='w-10 h-10 bg-orange-500 text-white-600 flex items-center justify-center rounded-full cursor-pointer'>
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    {/* {open && (
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
                            <div onClick={() => navigate("/orders")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Orders</div>
                            <div onClick={() => navigate("/profile")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                            <div onClick={() => navigate("/cart")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Cart</div>
                            <div onClick={logout} className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">Logout</div>
                        </div>
                    )} */}


                    {open && (
                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>

                            <div onClick={() => {
                                setOpen(false);
                                navigate("/profile")
                            }}
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                            >
                                My Profile
                            </div>

                            {role === "ADMIN" && (
                                <>

                                    <div onClick={() => { setOpen(false); navigate("/admin") }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Admin Dashboard
                                    </div>
                                    <div onClick={() => { setOpen(false); navigate("/orders") }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        All Users' Orders
                                    </div>
                                </>
                            )}

                            {role === "USER" && (
                                <>
                                    <div onClick={() => { setOpen(false); navigate("/orders") }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        My Orders
                                    </div>
                                    
                                    <div onClick={() => { setOpen(false); navigate("/cart") }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        My Cart
                                    </div>
                                </>
                            )}

                            <div onClick={logout} className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                                Logout
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default Navbar