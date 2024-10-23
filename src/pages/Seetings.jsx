import React, { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContextProvider";
import { Link, redirect, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

export function settingloader(){
  const user = localStorage.getItem("user");
  if (!user) {
    return redirect("/");
  }
  return null;
}

function Seetings() {
  const { auth, setAuth, setuserdetail } = useAuth();

  const [userdata, setuserdata] = useState({});
  const email = auth?.email;
  const navigate = useNavigate();

  const getuserdetails = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8081/api/v1/user/userdetails",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userdetails = responce.data;

      setuserdata(userdetails);
      setuserdetail(userdetails);
    } catch (error) {}
  };

  useEffect(() => {
    getuserdetails();
  }, [email]);

  return (
    <div>
      {/* <nav>
        <Link to="/profileupdate">Profile Upadate</Link>
        <Link to="/changepassword">Change Password</Link>
      </nav> */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          width: "90%",
          margin: "2rem auto",
          fontWeight: "900",
        }}
      >
        <div className="container">
          <div className="navbar-nav">
            <FaUserCircle
              style={{
                fontSize: "30px",
                display: "flex",
                alignItems: "center",
                marginTop: ".5rem",
                marginRight: ".5rem",
              }}
            />
            <Link to="/profileupdate" className="nav-item nav-link">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <IoSettingsSharp />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: ".5rem",
                  }}
                >
                  Profile Update
                </div>
              </div>
            </Link>
            <Link to="/changepassword" className="nav-item nav-link">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <MdOutlineSecurity />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: ".5rem",
                  }}
                >
                  Change Password
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div
        style={{
          width: "90%",
          margin: " 2rem auto",
        }}
      >
        <h1
          style={{
            marginBottom: "1rem",
          }}
        >
          Basic Profile
        </h1>

        {userdata && (
          <div
            style={{
              fontSize: "1.5rem",
            }}
          >
            <p>First Name : {userdata.firstname}</p>
            <p>Last Name : {userdata.lastname}</p>
            <p>User Name : {userdata.username}</p>
            <p>Phone : {userdata.phone}</p>
            <p> Email : {userdata.email}</p>
            <p>Id : {userdata._id}</p>
          </div>
        )}
        {/* <Link to="/profileupdate" className="btn btn-primary">
      Update
    </Link> */}

        <Link
          to="/profileupdate"
          className="btn btn-primary btn-block"
          style={{
            width: "100px",
            padding: ".5rem",
          }}
          data={userdata}
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default Seetings;
