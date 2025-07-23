import React from 'react'
import user from '../assets/img/user3.png'
import { LuPackage } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { FiMessageSquare } from "react-icons/fi";

const Header = () => {
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light" id='navmain'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><LuPackage className='header-icon' /></a>
                    <h2 className="headingname">Inventory</h2>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 
                      
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <form className="d-flex" role="search" id="search">
                            <input className="form-control shadow-none me-2" type="search" id='searchin' placeholder="Search" aria-label="Search" />
                            <i className="fa-solid fa-magnifying-glass" id='search-icon'></i>
                        </form>
                        <div>
                            <GoBell className='bell-icon' />
                            <FiMessageSquare className='bell-icon' />
                        </div>
                        <img src={user} className="userlogo" alt="" />
                    </div>
                </div>
            </nav>

          
        </>
    )
}

export default Header
