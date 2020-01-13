import './Logo.css'
import logo from '../../assets/imgs/logo512.png'
import React from 'react'
import {Link} from 'react-router-dom'
export default props =>
    <aside className="logo">
        <Link to="/" className="logo">
            <img className="img-responsive"src={logo} alt="logo" />
        </Link>
    </aside>