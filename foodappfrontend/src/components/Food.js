import React from 'react'
import "./Food.css"
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
function Food() {
    return (
        <div>
            <div>
                <Nav/>
            </div>

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
        </div>
    )
}

export default Food
