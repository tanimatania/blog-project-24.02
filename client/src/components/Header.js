import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  const { user, signIn, signOut } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {user ? `You are now Admin` : <button onClick={signIn}>signIn</button>}
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {user && (
              <React.Fragment>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                <li>
                  <button onClick={signOut}>sign out</button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
