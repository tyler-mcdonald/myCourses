import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Header = ({ signOut }) => {
  const user = useContext(UserContext);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {user ? (
            <ul className="header--signedin">
              <li>{`Welcome, ${user.firstName}!`}</li>
              <li>
                <Link to="/signout" onClick={() => signOut()}>
                  Sign Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedin">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
