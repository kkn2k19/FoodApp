import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function DeleteFood() {
    let [fid, setFid] = useState("");
    let [msg, setMsg] = useState("");
    const refreshData = () => {
        setMsg("");
        setFid("");
    }
    const deleteFood = () => {
        axios.delete(`http://localhost:1005/food/delete/${fid}`)
            .then((res) => {
                console.log(res.data);
                setMsg(res.data);
            })
            .catch((error) => {
                console.log(error);
                setMsg("Failed to delete food");
            })
    }
    return (
        <div style={{ margin: "50px auto" }}>
            <h2 className='text-primary'>Deleting Product</h2>
            <input type='text' className='form-control' placeholder='Enter Food ID to Delete' value={fid} onChange={(event) => {
                setFid(event.target.value);
            }} />
            <button className='btn btn-outline-primary' style={{ marginTop: "5px" }} onClick={deleteFood} >Delete</button> &nbsp; &nbsp;
            <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }} onClick={refreshData}>Refresh</button>
            <h2 className='text-danger'>{msg}</h2>
        </div>
    )
}

export default DeleteFood
