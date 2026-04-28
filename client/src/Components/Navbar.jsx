import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import "./Navbar.css"
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../contexts/UserHooks';

const Navbar = () => {

  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  const { profileReady } = useProfile();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>
        <div className='profile-options'>
          {profileReady ? (
            <>
              <Link to="/profile" className='nav-link'>Profile</Link>
              <p onClick={logout} className='login-button'>Logout</p>
            </>
          ) : isAuthenticated ? (
            <>
              <p className='nav-link'>Retrieving user info...</p>
              <p onClick={logout} className='login-button'>Emergency logout</p>
            </>
          ) : (
            <Link to="/login" className="nav-link login-button">Login</Link>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
