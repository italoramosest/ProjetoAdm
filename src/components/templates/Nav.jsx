import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to='/'>
                <i className="fa fa-home">  Inicio</i>
            </Link>
            <Link to ="/users">
                <i className="fa fa-users"> Operadores</i>
            </Link>
            <Link to="/fazenda">
                <i className="fas fa-columns"></i>
                <i className="fa fa-warehouse"> Fazendas</i>
            </Link>
        </nav>
    </aside>