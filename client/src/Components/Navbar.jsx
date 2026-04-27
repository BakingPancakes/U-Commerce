import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import "./Navbar.css"
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

  const {
    isAuthenticated,
    isLoading,
  } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
          <Link to="/profile" className='nav-link profile-button'>Profile</Link>
        ) : <Link to="/login" className="nav-link login-button">Login</Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
