import { Link, redirect } from "react-router-dom";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/AuthContextProvider";
import CustomDropdown from "../pages/CustomDropdown";
import DropdownItemTagsExample from "../pages/BlogsDropdown";

function Nav() {
  const { auth, setAuth } = useAuth();

  return (
    <nav className={styles.nav}>
      <h2>
        <Link to="/" className={styles.blogheading}>
          BlogApp
        </Link>
      </h2>
      <ul className={styles.navItems}>
        <DropdownItemTagsExample />

        {!auth?.access_token && (
          <div>
            <button type="button" className="btn btn-secondary mx-2">
              <Link to="/login" className="text-white text-decoration-none">
                Login
              </Link>
            </button>
            <button type="button" className="btn btn-secondary mx-2">
              <Link to="/signup" className="text-white text-decoration-none">
                Get Started
              </Link>
            </button>
          </div>
        )}

        {auth?.access_token && (
          <div className={styles.navItems}>
            {auth?.access_token && <CustomDropdown />}
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
