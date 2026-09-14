import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (user?.role === 'admin') {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">
              Admin Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              Users
            </Link>
          </li>

          <li>
            <Link to="/admin/skills">
              Skills
            </Link>
          </li>

          <li>
            <Link to="/admin/swaps">
              Swap Requests
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              Reviews
            </Link>
          </li>

          <li>
            <Link
              to="/"
              onClick={handleSignOut}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/skills">Skills</Link>
        </li>

        <li>
          <Link to="/community">Community</Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/sign-up">
                Sign Up
              </Link>
            </li>

            <li>
              <Link to="/sign-in">
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/swaps">
                My Swaps
              </Link>
            </li>

            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <Link
                to="/"
                onClick={handleSignOut}
              >
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;