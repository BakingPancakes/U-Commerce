import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import "./Navbar.css"
import { useAuth0 } from '@auth0/auth0-react';
import { useProfile } from '../contexts/UserHooks';
import { useEffect } from 'react';

const Navbar = () => {

  const {
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth0();

  const profile = useProfile();
  
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log("Retrieved user data:", profile)
    }
  }, [isAuthenticated, isLoading, profile])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listings" className="nav-link">Listings</Link>
        <div className='profile-options'>
          {isLoading ? (
            <p>Loading...</p>
          ) : isAuthenticated ? (
              <>
                <Link to="/profile" className='nav-link profile-button'>Profile</Link>
                <p onClick={logout} className='login-button'>Logout</p>
              </>
            ) : <Link to="/login" className="nav-link login-button">Login</Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
