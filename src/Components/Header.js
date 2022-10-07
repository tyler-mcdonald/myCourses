import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

export const Header = () => {
  const { user, actions } = useContext(Context);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">myCourses</Link>
        </h1>
        <nav>
          {user ? (
            <ul className="header--signedin">
              <li>{`Welcome, ${user.firstName}!`}</li>
              <li>
                <Link to="/signout" onClick={() => actions.signOut()}>
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
