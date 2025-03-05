import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {
    var navigate = useNavigate();
    let [user, setUser] = useState({
        uname: "",
        pass: "",
        nm: "",
        email: "",
        phno: ""
    })
    let [msg, setMsg] = useState("");
    const refresh = () => {
        setMsg("");
        setUser({
            uname: "",
            pass: "",
            nm: "",
            email: "",
            phno: ""
        })
    }
    const addUser = ()=>{
        axios.post("http://localhost:1005/register/add", user)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
            if(res.data === "Successfully Registered"){
                navigate("/login");
            }
        })
        .catch((error)=>{
            console.log(error);
            alert("Failed to add User");
        })
    }
    return (
        <div style={{ width: "30%", margin: "50px auto" }}>
            <h2 className='text-primary'>Registration Form</h2>
            <input type='text' placeholder='Enter your Username' className='form-control' value={user.uname} onChange={(event) => {
                setUser({
                    ...user,
                    uname: event.target.value
                })
            }} />
            <input type='password' placeholder='Enter your Password' className='form-control' value={user.pass} onChange={(event) => {
                setUser({
                    ...user,
                    pass: event.target.value
                })
            }} />
            <input type='text' placeholder='Enter your Name' className='form-control' value={user.nm} onChange={(event) => {
                setUser({
                    ...user,
                    nm: event.target.value
                })
            }} />
            <input type='text' placeholder='Enter your Email' className='form-control' value={user.email} onChange={(event) => {
                setUser({
                    ...user,
                    email: event.target.value
                })
            }} />
            <input type='text' placeholder='Enter your Phone Number' className='form-control' value={user.phno} onChange={(event) => {
                setUser({
                    ...user,
                    phno: event.target.value
                })
            }} />
            <button className='btn btn-outline-primary' style={{ marginTop: "5px" }} onClick={addUser}>Register</button> &nbsp; &nbsp;
            <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }} onClick={refresh}>Refresh</button> &nbsp; &nbsp;
            <button className='btn btn-outline-success' style={{ marginTop: "5px" }}
                onClick={() => {
                    navigate("/");
                }}>Home</button>
            <h2 className='text-danger'>{msg}</h2>
        </div>
    )
}

export default Register
