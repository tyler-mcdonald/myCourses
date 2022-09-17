import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Header = () => {
  const user = useContext(UserContext);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedin">
            {user ? (
              <li>{`Welcome, ${user.name}!`}</li>
            ) : (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            )}

            <li>
              <Link to="/signout">Sign Out</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
