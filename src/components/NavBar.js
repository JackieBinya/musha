import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
  let location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  }, [location]);

  return (
    <nav className="menu">
      <div className="menu-container">
        <div>
          <Link className="menu-logo" to="/">
            mushaa
          </Link>
        </div>

        <div className="menu-mobile-control">
          <button
            type="button"
            className={!isMenuVisible ? 'show' : 'hide'}
            onClick={() => setIsMenuVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <button
            type="button"
            className={!isMenuVisible ? 'hide' : 'show'}
            onClick={() => setIsMenuVisible(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <ul
          className={`menu-list__desktop ${isMenuVisible ? 'hide' : 'reveal'}`}
        >
          <li>
            <Link className={currentUser ? 'show' : 'hide'} to="/my-properties">
              My Properties
            </Link>
          </li>

          <li>
            <Link className={currentUser ? 'hide' : 'show'} to="/login">
              Log In
            </Link>
          </li>

          <li>
            <Link className={currentUser ? 'hide' : 'show'} to="/signup">
              Sign Up
            </Link>
          </li>

          <li>
            <button className={currentUser ? 'show' : 'hide'} type="button">
              Sign Out
            </button>
          </li>
        </ul>
      </div>

      <ul className={`menu-list__mobile ${isMenuVisible ? 'show' : 'hide'}`}>
        <li>
          <Link className={currentUser ? 'show' : 'hide'} to="/my-properties">
            My Properties
          </Link>
        </li>

        <li>
          <Link className={currentUser ? 'hide' : 'show'} to="/login">
            Log In
          </Link>
        </li>

        <li>
          <Link className={currentUser ? 'hide' : 'show'} to="/signup">
            Sign Up
          </Link>
        </li>

        <li>
          <button className={currentUser ? 'show' : 'hide'} type="button">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};
