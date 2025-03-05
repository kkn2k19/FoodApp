import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
function Login() {
    var navigate = useNavigate();
    let [user, setUser] = useState({
        uname: "",
        pass: "",
        nm: "",
        email: "",
        phno: ""
    })
    let [msg, setMsg] = useState("")
    const checkLogin = (uname, pass) => {
        axios.get(`http://localhost:1005/register/login/${uname}/${pass}`)
            .then((res) => {
                if (uname === "admin" && pass === "admin") {
                    navigate('/nav');
                } else {
                    if (res.data === "Login Successfull") {
                        navigate('/navclient');
                    } else {
                        setMsg(res.data);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setMsg("Invalid Credentials");
            })
    }
    const refresh = () => {
        setUser({
            uname: "",
            pass: "",
            nm: "",
            email: "",
            phno: ""
        })
        setMsg("")
    }
    return (
        <div style={{ margin: "50px auto", width: "30%" }}>
            <h2 className='text-primary' >Login Form</h2>
            <input type="text" className='form-control' placeholder='Enter Your Username'
                value={user.uname} onChange={(event) => {
                    setUser({
                        ...user,
                        uname: event.target.value
                    })
                }} />
            <input type="password" className='form-control' placeholder='Enter Your Password'
                value={user.pass} onChange={(event) => {
                    setUser({
                        ...user,
                        pass: event.target.value
                    })
                }} />
            <button className='btn btn-outline-primary' style={{ marginTop: "5px" }}
                onClick={() => {
                    checkLogin(user.uname, user.pass);
                }}>Login</button> &nbsp;&nbsp;
            <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }}
                onClick={refresh}>Refresh</button> &nbsp;&nbsp;
            <button className='btn btn-outline-success' style={{ marginTop: "5px" }}
                onClick={() => {
                    navigate("/");
                }}>Home</button>
            <h2 className='text-danger'>{msg}</h2>
        </div>
    )
}

export default Login
