import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const { auth, persist }: any = useAuth();

  let loggedIn = false;

  !auth?.accessToken && persist ? (loggedIn = true) : (loggedIn = false);

  return (
    <>
      <nav className="nav">
        <h2>User Management System</h2>
        <div className="nav__spans">
          <span>
            <Link to="/">Home</Link>
          </span>
          {loggedIn ? (
            <>
              <span>
                <Link to="/login">Login</Link>
              </span>
              <span>
                <Link to="/register">Register</Link>
              </span>
            </>
          ) : (
            <span className="priv__pages">Private Pages</span>
          )}
          <span>
            <Link to="/users">Users</Link>
          </span>
          <span>
            <Link className="admin__nav" to="/admin">
              Admin Page
            </Link>
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
