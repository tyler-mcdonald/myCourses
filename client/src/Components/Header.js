import React from "react";

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="index.html">Title</a>
        </h1>
        <nav>
          <ul className="header--signedin">
            <li>Welcome, Joe Smith!</li>
            <li>
              <a href="sign-out.html">Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
