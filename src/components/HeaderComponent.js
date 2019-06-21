/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const HeaderComponent = () =>{
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><a href="#" className = "navbar-brand">My MoneyBook</a></div>
                <ul className = "navbar-nav">
                    <li>
                        <a href='/' style={{color:'#fff'}}>Home</a>
                    </li>
                </ul>
        </nav>
    )
}
export default HeaderComponent