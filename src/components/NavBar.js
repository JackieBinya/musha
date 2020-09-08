import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../musha-logo-svg.svg';
import { firebase } from '../firebase';

const NavBar = ({ history }) => {
  let location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  //Given that mobile menu is open, when a user clicks a menu item and is redirected to a new page the code below closes the menu
  useEffect(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  }, [location]);

  const handleLogOut = () => {
    firebase.auth().signOut();
    history.push('/');
  };

  return (
    <header className="menu">
      <div className="menu-container">
        <div>
          <Link className="menu-logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="menu-mobile-control">
          <button
            type="button"
            className={`menu-button ${!isMenuVisible ? 'show' : 'hide'}`}
            data-testid="open-menu-action"
            onClick={() => setIsMenuVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <button
            type="button"
            className={`menu-button ${!isMenuVisible ? 'hide' : 'show'}`}
            data-testid="close-menu-action"
            onClick={() => setIsMenuVisible(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <ul
          className={`menu-list__desktop ${isMenuVisible ? 'hide' : 'reveal'}`}
        >
          <li>
            <Link
              to="/my-properties/post"
              className={`post-button ${currentUser ? 'show' : 'hide'}`}
              type="button"
            >
              Post an ad
            </Link>
          </li>

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
            <button
              onClick={handleLogOut}
              data-testid="logout-action"
              className={`logout-button ${currentUser ? 'show' : 'hide'}`}
              type="button"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>

      <ul
        data-testid="mobile-menu-list"
        className={`menu-list__mobile ${isMenuVisible ? 'show' : 'hide'}`}
      >
        <li>
          <Link
            to="/my-properties/post"
            className={`post-button ${currentUser ? 'show' : 'hide'}`}
            type="button"
          >
            Post an ad
          </Link>
        </li>

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
          <button
            onClick={handleLogOut}
            className={`logout-button ${currentUser ? 'show' : 'hide'}`}
            type="button"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </header>
  );
};
export default withRouter(NavBar);
