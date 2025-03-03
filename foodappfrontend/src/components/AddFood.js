import React from 'react'
import axios from 'axios'
import { useState } from 'react'
function AddFood() {
    let [food, setFood] = useState({
        fid: "",
        fname: "",
        fprice: ""
    })
    let [msg, setMsg] = useState("");

    const addFood = () => {
        axios.post("http://localhost:1005/food/add", food)
            .then((res) => {
                console.log(res.data);
                setMsg(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to add Food");
            })
    }

    const refresh = () => {
        setFood({
            fid: "",
            fname: "",
            fprice: ""
        })
        setMsg("");
    }
    return (
        <div style={{ margin: "50px auto" }}>
            <h2 className='text-primary'>ADDING FOOD</h2>
            <input type="text" className='form-control' placeholder='Enter Food ID' value={food.fid} onChange={(event) => {
                setFood({
                    ...food,
                    fid: event.target.value
                })
            }} />
            <input type="text" className='form-control' placeholder='Enter Food name' value={food.fname} onChange={(event) => {
                setFood({
                    ...food,
                    fname: event.target.value
                })
            }} />
            <input type="text" className='form-control' placeholder='Enter Food price' value={food.fprice} onChange={(event) => {
                setFood({
                    ...food,
                    fprice: event.target.value
                })
            }} />
            <button className='btn btn-outline-primary' style={{ marginTop: "5px" }} onClick={addFood}>Add</button>
            <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }} onClick={refresh}>Refresh</button>
            <h2 className='text-danger' >{msg}</h2>
        </div>
    )
}

export default AddFood
