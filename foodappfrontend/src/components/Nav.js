import React from 'react'
import "./Nav.css"
function Nav() {
    return (
        <div className='container'>
            <div className='leftContainer'>
                <h2>Food App</h2>
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
