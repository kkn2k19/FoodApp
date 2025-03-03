import React from 'react'
import "./Food.css"
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function Food() {
    return (
        <div className='container'>
            <div className='leftContainer'>
                <Link to="add" >ADD FOOD</Link>
                <Link to="update" >UPDATE FOOD</Link>
                <Link to="delete" >DELETE FOOD</Link>
            </div>
            <div className='rightContainer'>
                <Outlet />
            </div>
        </div>
    )
}

export default Food
