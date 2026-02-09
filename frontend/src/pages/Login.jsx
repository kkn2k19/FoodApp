// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { useState } from 'react';
// function Login() {
//     var navigate = useNavigate();
//     let [user, setUser] = useState({
//         uname: "",
//         pass: "",
//         nm: "",
//         email: "",
//         phno: ""
//     })
//     let [msg, setMsg] = useState("")
//     const checkLogin = (uname, pass) => {
//         axios.get(`http://localhost:1005/register/login/${uname}/${pass}`)
//             .then((res) => {
//                 if (uname === "admin" && pass === "admin") {
//                     navigate('/nav');
//                 } else {
//                     if (res.data === "Login Successfull") {
//                         navigate('/navclient');
//                     } else {
//                         setMsg(res.data);
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setMsg("Invalid Credentials");
//             })
//     }
//     const refresh = () => {
//         setUser({
//             uname: "",
//             pass: "",
//             nm: "",
//             email: "",
//             phno: ""
//         })
//         setMsg("")
//     }
//     return (
//         <div style={{ margin: "50px auto", width: "30%" }}>
//             <h2 className='text-primary' >Login Form</h2>
//             <input type="text" className='form-control' placeholder='Enter Your Username'
//                 value={user.uname} onChange={(event) => {
//                     setUser({
//                         ...user,
//                         uname: event.target.value
//                     })
//                 }} />
//             <input type="password" className='form-control' placeholder='Enter Your Password'
//                 value={user.pass} onChange={(event) => {
//                     setUser({
//                         ...user,
//                         pass: event.target.value
//                     })
//                 }} />
//             <button className='btn btn-outline-primary' style={{ marginTop: "5px" }}
//                 onClick={() => {
//                     checkLogin(user.uname, user.pass);
//                 }}>Login</button> &nbsp;&nbsp;
//             <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }}
//                 onClick={refresh}>Refresh</button> &nbsp;&nbsp;
//             <button className='btn btn-outline-success' style={{ marginTop: "5px" }}
//                 onClick={() => {
//                     navigate("/");
//                 }}>Home</button>
//             <h2 className='text-danger'>{msg}</h2>
//         </div>
//     )
// }

// export default Login


import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const login = () => {
        api.post("/api/auth/login", { email, password })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                navigate("/");
                // window.location.href = "/";
            })
            // .catch(() => alert("Invalid Credentials"));
            .catch((e) => {
                const msg = e.response?.data || "Login failed";
                alert(msg);
                if (msg.includes("verify your email")) {
                    navigate("/verify-otp", { state: { email, type: "VERIFY" } });
                }
            })
    };

    return (
        // <div>Login</div>

        // <div className='container items-center justify-center min-h-screen'>
        //     <div className='p-6 max-w-sm mx-auto'>
        //         <input type="text" className='form-control' placeholder='Email' onChange={e => setEmail(e.target.value)} />
        //         <input type="password" className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)} />
        //         <button className='btn btn-primary' onClick={login}>Login</button>
        //     </div>
        // </div>

        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-center mb-6'>Login to FoodApp</h2>
                <div className='space-y-2'>
                    <input
                        type="email"
                        placeholder='Email address'
                        className='w-full px-4 py-2 border rounded-lg'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter your Password'
                            className='w-full px-4 py-2 border rounded-lg pr-12'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span
                            className='absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                    <button
                        onClick={login}
                        className='w-full bg-orange-500 text-white py-2 rounded-lg'
                    >
                        Login
                    </button>
                </div>

                <p className='text-sm text-center mt-2'>
                    <span
                        className='text-orange-500 cursor-pointer hover:underline'
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </span>
                </p>

                <p className='text-sm text-center text-gray-500'>
                    Don't have an account? {" "}
                    <span
                        className='text-orange-500 cursor-pointer hover:underline'
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Login