import React from 'react'
import "./Nav.css"
// import { useNavigate } from 'react-router-dom'
function Nav() {
    // var navigate = useNavigate();
    return (
        <div className='container' >
            <div className='leftContainer'>
                <h2>FoodApp Admin</h2>
                {/* <h2 style={{ cursor: "pointer", color: "yellow" }} onClick={() => navigate("/")}>FoodApp Admin</h2> */}
            </div>
            <div className='rightContainer'>
                <a href="/food">FOOD</a>
                <a href="/flist">FOODLIST</a>
                <a href="/sfood">SEARCH FOOD</a>
                <a href="/contact">CONTACT US</a>
            </div>
        </div>
    )
}

export default Nav
