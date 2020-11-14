import React from "react";
import { Link, Redirect } from "react-router-dom";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        UTravel
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={props.logOut}>
              <i className="fas fa-sign-out-alt"></i> Log Out
            </Link>
            {/* <a className="nav-link" href="/logout">
              Logout
            </a> */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/favorites">
              Favorites
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
