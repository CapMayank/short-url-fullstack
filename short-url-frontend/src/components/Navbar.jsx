import React, { useState } from 'react'; // Import useState
import Cookies from 'js-cookie'; // Import cookie parsing library
import logo from '../assets/icons8-shorten-urls-480.png';
import './Navbar.css';
import { useAuth } from './AuthContext';

const Navbarcomp = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu toggle
  const { isLoggedIn } = useAuth();
  
  const logout = () => {
    Cookies.remove('uid');
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu state
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span><a href="/">URL SHOR10er</a></span>
      </div>
      
      <button className="menu-toggle" onClick={toggleMenu}> {/* Add toggle button */}
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}> {/* Apply class based on menu state */}
        <ul>
          <li><a href="/">Shorten URL</a></li>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="/allurls">All URLs</a></li>
          {isLoggedIn ? (
            <li><a className='logout' onClick={logout}>Logout</a></li>
          ) : (
            <>
              <li><a href="/signup">Signup</a></li>
              <li><a href="/login">Login</a></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbarcomp;
