// CustomDropdown.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../contexts/AuthContextProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, redirect } from "react-router-dom";
function CustomDropdown() {
  const { auth, setAuth } = useAuth();

  function logout() {
    setAuth({});
    localStorage.removeItem("user");
    return redirect("/");
  }
  return (
    <Dropdown className="dropdown-user-profile">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="btn btn-success dropdown-toggle"
      >
        User Profile
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
        <Dropdown.Item href="#/action-1" className="dropdown-item">
          <li>
            <p className="text-muted">Welcome, {auth.email.split("@")[0]}</p>
          </li>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" className="dropdown-item">
          <Link to="/settings" className="text-decoration-none text-dark">
            Settings
          </Link>
        </Dropdown.Item>

        <Dropdown.Item href="#/action-3" className="dropdown-item">
          <button
            onClick={() => logout()}
            className="btn btn-sm btn-danger rounded-pill px-3 py-1"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;
