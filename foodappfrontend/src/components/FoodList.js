import React, { useEffect, useState } from 'react'
import axios from 'axios';
function FoodList() {
    let [food, setFood] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:1005/food/fetch")
            .then((res) => {
                console.log(res.data);
                setFood(res.data);
            })
            .catch((error) => {
                console.log(error);
                alert("SOME THING WENT WRONG ON FETCHING DATA");
            }, [])
    })
    return (
        <div>
            <h2 className='text-primary' >Available Food List</h2>
            {
                food.length > 0 ?
                    <div style={{width:"60%", margin:"50px auto"}}>
                        <table className='table table-hover table-striped'>
                            <thead className='table table-dark'>
                                <tr>
                                    <td>Food ID</td>
                                    <td>Food Name</td>
                                    <td>Price</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    food.map((element,index)=>{
                                        return (
                                            <tr>
                                                <td>{element.fid}</td>
                                                <td>{element.fname}</td>
                                                <td>{element.fprice}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <h2 style={{ color: "red" }}>NO FOOD FOUND</h2>
            }
        </div>
    )
}

export default FoodList
