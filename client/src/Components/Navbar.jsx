import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>
        <Link to="/login" className="nav-link login-button">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
