// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';

// function Register() {
//     var navigate = useNavigate();
//     let [user, setUser] = useState({
//         uname: "",
//         pass: "",
//         nm: "",
//         email: "",
//         phno: ""
//     })
//     let [msg, setMsg] = useState("");
//     const refresh = () => {
//         setMsg("");
//         setUser({
//             uname: "",
//             pass: "",
//             nm: "",
//             email: "",
//             phno: ""
//         })
//     }
//     const addUser = ()=>{
//         axios.post("http://localhost:1005/register/add", user)
//         .then((res)=>{
//             console.log(res.data);
//             setMsg(res.data);
//             if(res.data === "Successfully Registered"){
//                 navigate("/login");
//             }
//         })
//         .catch((error)=>{
//             console.log(error);
//             alert("Failed to add User");
//         })
//     }
//     return (
//         <div style={{ width: "30%", margin: "50px auto" }}>
//             <h2 className='text-primary'>Registration Form</h2>
//             <input type='text' placeholder='Enter your Username' className='form-control' value={user.uname} onChange={(event) => {
//                 setUser({
//                     ...user,
//                     uname: event.target.value
//                 })
//             }} />
//             <input type='password' placeholder='Enter your Password' className='form-control' value={user.pass} onChange={(event) => {
//                 setUser({
//                     ...user,
//                     pass: event.target.value
//                 })
//             }} />
//             <input type='text' placeholder='Enter your Name' className='form-control' value={user.nm} onChange={(event) => {
//                 setUser({
//                     ...user,
//                     nm: event.target.value
//                 })
//             }} />
//             <input type='text' placeholder='Enter your Email' className='form-control' value={user.email} onChange={(event) => {
//                 setUser({
//                     ...user,
//                     email: event.target.value
//                 })
//             }} />
//             <input type='text' placeholder='Enter your Phone Number' className='form-control' value={user.phno} onChange={(event) => {
//                 setUser({
//                     ...user,
//                     phno: event.target.value
//                 })
//             }} />
//             <button className='btn btn-outline-primary' style={{ marginTop: "5px" }} onClick={addUser}>Register</button> &nbsp; &nbsp;
//             <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }} onClick={refresh}>Refresh</button> &nbsp; &nbsp;
//             <button className='btn btn-outline-success' style={{ marginTop: "5px" }}
//                 onClick={() => {
//                     navigate("/");
//                 }}>Home</button>
//             <h2 className='text-danger'>{msg}</h2>
//         </div>
//     )
// }

// export default Register


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Register = () => {
    const [formData, setFormData] = useState({
        role: "USER",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: ""
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [emailExists, setEmailExists] = useState(null);  // true / false

    const checkEmail = () => {
        if (!formData.email) return;
        api.post("/api/auth/check-email-present", { email: formData.email })
            .then(res => {
                setEmailExists(res.data); // true if exists, false if not
            })
            .catch(() => setEmailExists(null));
    }

    const register = () => {
        if (emailExists) {
            alert("Account already exists. Please login.");
            return;
        }
        api.post("/api/auth/register", formData)
            .then((res) => {
                alert(res.data);
                navigate("/verify-otp", { state: { email: formData.email, type: "VERIFY" } });
            })
            .catch(e => alert(e.response?.data || "Registration failed"));
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        // <div>Register</div>
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-3'>
                <h2 className='text-xl font-bold text-center'>Create Account</h2>

                <input
                    name="name"
                    placeholder='Full Name'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                />
                {/* <input
                    name="email"
                    placeholder='Email'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                /> */}

                {/* // email input + veriify  */}
                <div className='space-y-1'>
                    <input
                        name="email"
                        placeholder='Email'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                        onBlur={checkEmail}
                    // disabled={emailVerified}
                    />

                    {emailExists === true && (
                        <div className='text-red-600 text-sm flex justify-between items-center'>
                            <span>Account already exists</span>
                            <button
                                onClick={() => navigate("/login")}
                                className='text-blue-600 underline'>
                                Login
                            </button>
                        </div>
                    )}
                </div>

                <input
                    name="phone"
                    placeholder='Phone Number'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                    onChange={handleChange}
                />
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder='Password'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                    />
                    <span
                        className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                        onChange={handleChange}
                    />
                    <span
                        className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>

                {/* ROLE */}
                <select
                    name="role"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <input
                    name="addressLine1"
                    placeholder="Address Line 1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                />
                <input
                    name="addressLine2"
                    placeholder="Address Line 2 (Optional)"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                />
                <input
                    name="city"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                />
                <input
                    name="state"
                    placeholder="State"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                />
                <input
                    name="pincode"
                    placeholder="Pincode"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={handleChange}
                />

                <button onClick={register} className="w-full bg-orange-500 text-white py-2 rounded-lg">
                    Register
                </button>

                <p className='text-sm text-center'>
                    Already have an account? {" "}
                    <span
                        onClick={() => navigate("/login")}
                        className='text-orange-500 cursor-pointer'>
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register