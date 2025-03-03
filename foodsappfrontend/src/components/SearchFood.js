import React, { useState } from 'react'
import axios from 'axios';
function SearchFood() {
    let [food, setFood] = useState({
        fid: "",
        fname: "",
        fprice: 0
    });
    let [data, setData] = useState({
        fid: "",
        fname: "",
        fprice: 0
    });
    const getFood = (fid) => {
        axios.get(`http://localhost:1005/food/fetch/${food.fid}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Food not Found");
            })
    }
    return (
        <div style={{width:"30%", margin:"50px auto"}}>
            <h2 className='text-danger'>Search Food</h2>
            <input type='text' placeholder='Enter Food ID' className='form-control' value={food.fid} onChange={(event) => {
                setFood({
                    ...food,
                    fid: event.target.value
                })
            }} />

            <button className='btn btn-primary' onClick={getFood}>GET DETAILS</button>
            <div>
                <table className='table table-hover table-bordered'>
                    <thead className='table table-dark'>
                        <tr>
                            <th>Food ID</th>
                            <th>Food Name</th>
                            <th>Food Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.fid}</td>
                            <td>{data.fname}</td>
                            <td>{data.fprice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchFood
