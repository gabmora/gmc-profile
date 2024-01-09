import React from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as  Routes, Route} from 'react-router-dom';
import './Header.css'
// import Contact from './Contact'

function Header(){
    return(
    // <header className="header">Header</header>
    <header className="header">
    <Link to="/" className="logo-link"> {/* Link to the home page */}
        <div className="header-logo">
        {/* <img src={logo} alt="logo" /> */}
        </div>
    </Link>
    <nav className="header-nav">
        <Link to="/about" className="nav-link">01. About </Link>
        <Link to="/experiance" className="nav-link">02. Experiance</Link>
        <Link to="/services" className="nav-link">03. Services</Link>
      
        <Link to="/contact" className="nav-link">04. Contact</Link>
        {/* <Route path="/Contact" element={<Contact />} ></Route> */}
      
        <button className="resume-button">Resume</button>


        
    </nav>
    </header>


    );
}


export default Header