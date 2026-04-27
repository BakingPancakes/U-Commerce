import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import "./Navbar.css"
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

  const {
    isAuthenticated,
  } = useAuth0();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>
        {isAuthenticated ? (
          <Link to="/profile" className='nav-link'>Profile</Link>
        ) : <Link to="/login" className="nav-link login-button">Login</Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
