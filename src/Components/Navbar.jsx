import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'

function Navbar() {
  const [nav, setNav] = useState(false);
  const openNav = () => {
    setNav(!nav);
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          SecureAadhar
        </Link>
      </h1>
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>

        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>

        <li>
          <Link to="/usermenu" className="navbar-links">
            User Menu
          </Link>
        </li>
       
        <li>
          <Link to="/institutionmenu" className="navbar-links">
            Institution Menu
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;