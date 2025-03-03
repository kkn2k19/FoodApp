import React, { useState } from 'react'
import axios from 'axios';
function UpdateFood() {
    let [food, setFood] = useState({
        fid: "",
        fname: "",
        fprice: ""
    });
    let [msg, setMsg] = useState("");

    const refreshData = () => {
        setMsg("");
        setFood(
            {
                fid: "",
                fname: "",
                fprice: ""
            }
        )
    }

    const updateFood = () => {
        axios.put(`http://localhost:1005/food/update/${food.fid}`, food)
            .then((res) => {
                console.log(res.data);
                setMsg(res.data);
            })
            .catch((error) => {
                console.log(error);
                setMsg("Failed to update food");
            })
    }

    return (
        <div style={{ margin: "50px auto" }}>
            <h2 className='text-primary'>Updating Food</h2>
            <input type='text' className='form-control' placeholder='Enter the Food Id' value={food.fid} onChange={(event) => {
                setFood(
                    {
                        ...food,
                        fid: event.target.value
                    }
                )
            }} />
            <input type='text' className='form-control' placeholder='Enter Updated Food Name' value={food.fname} onChange={(event) => {
                setFood(
                    {
                        ...food,
                        fname: event.target.value
                    }
                )
            }} />
            <input type='text' className='form-control' placeholder='Enter Updated Price' value={food.fprice} onChange={(event) => {
                setFood(
                    {
                        ...food,
                        fprice: event.target.value
                    }
                )
            }} />
            <button className='btn btn-outline-primary' style={{ marginTop: "5px" }} onClick={updateFood}>Update</button> &nbsp; &nbsp;
            <button className='btn btn-outline-secondary' style={{ marginTop: "5px" }} onClick={refreshData}>Refresh</button>
            <h2 className='text-primary'>{msg}</h2>
        </div>
    )
}

export default UpdateFood
