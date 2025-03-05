import React from 'react'
import NavClient from './NavClient'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
function Biiling() {
    let [user, setUser] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:1005/order/billing")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to fetch data")
            })
    }, [])
    return (
        <div>
            <div>
                <NavClient />
            </div>
            <div>
                <h2 className='text-primary'>Food Billing</h2>
                {
                    user.length > 0 ?
                        <div style={{ width: "60%", margin: "50px auto" }}>
                            <table className='table table-hover table-striped'>
                                <thead className='table table-dark'>
                                    <tr>
                                        <td>Order ID</td>
                                        <td>Order Date</td>
                                        <td>Food ID</td>
                                        <td>Food Name</td>
                                        <td>Quantity ordered</td>
                                        <td>Price</td>
                                        <td>Total Cost</td>
                                        <td>Username</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        user.map((element, index)=>{
                                            return (
                                                <tr>
                                                    <td>{element[0]}</td>
                                                    <td>{element[1]}</td>
                                                    <td>{element[2]}</td>
                                                    <td>{element[3]}</td>
                                                    <td>{element[4]}</td>
                                                    <td>{element[5]}</td>
                                                    <td>{element[6]}</td>
                                                    <td>{element[7]}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <h2 style={{ color: "red" }}>NO DATA FOUND</h2>
                }
            </div>
        </div>
    )
}

export default Biiling
