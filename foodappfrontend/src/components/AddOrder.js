import React, { useState } from 'react'
import NavClient from './NavClient'
import axios from 'axios'
function AddOrder() {
    let [order, setOrder] = useState({
        fid: "",
        oqty: "",
        uname: ""
    })
    let [msg, setMsg] = useState("")

    const addOrder = () => {
        axios.post("http://localhost:1005/order/add", order)
            .then((res) => {
                console.log(res.data);
                setMsg(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to add Order");
            })
    }
    const refresh = () => {
        setOrder({
            fid: "",
            oqty: "",
            uname: ""
        })
        setMsg("");
    }
    return (
        <div>
            <div>
                <NavClient />
            </div>
            <div style={{ width: "20%", margin: "50px auto" }}>
                <h2 className='text-primary'>Order Food</h2>
                <input type='text' className='form-control' placeholder='Enter the Food ID' value={order.fid} onChange={(event)=>{
                    setOrder({
                        ...order,
                        fid: event.target.value
                    })
                }} />
                <input type='text' className='form-control' placeholder='Enter the Food quantity in number' value={order.oqty} onChange={(event)=>{
                    setOrder({
                        ...order,
                        oqty: event.target.value
                    })
                }} />
                <input type='text' className='form-control' placeholder='Enter the Username' value={order.uname} onChange={(event)=>{
                    setOrder({
                        ...order,
                        uname: event.target.value
                    })
                }} />
                <button className='btn btn-outline-primary' style={{marginTop:"5px"}} onClick={addOrder} >Order Food</button> &nbsp; &nbsp;
                <button className='btn btn-outline-secondary' style={{marginTop: "5px"}} onClick={refresh} >Refresh</button>
                <h2 className='text-danger'>{msg}</h2>
            </div>
        </div>
    )
}

export default AddOrder
