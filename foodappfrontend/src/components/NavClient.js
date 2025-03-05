import React from 'react'

function NavClient() {
    return (
        <div className='container'>
            <div className='leftContainer text-primary'>
                <h2>FoodApp Client</h2>
            </div>
            <div className='rightContainer'>
                <a href="/flist">FOODLIST</a>
                <a href="/sfood">SEARCH FOOD</a>
                <a href="/order">ADD ORDER</a>
                <a href="/billing">BILLING</a>
            </div>
        </div>
    )
}

export default NavClient
