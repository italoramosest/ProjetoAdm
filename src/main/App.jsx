import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { HashRouter, BrowserRouter } from 'react-router-dom'

import Routes from './Routes'

import Nav from '../components/templates/Nav'
import Footer from '../components/templates/Footer'
import Logo from '../components/templates/Logo'
// import Home from '../components/home/Home'

export default props =>
    // <HashRouter /> da menos problema com apache
    // Browser tira o # das urls mas pode dar problema
    <BrowserRouter> 
        <div className="app">
            <Logo />
            <Nav />
            {/* <Home /> */}
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>

    