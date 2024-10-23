import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function ProfileUpdate() {
  const { userdetail } = useAuth();

  const [firstname, setfirstname] = useState(userdetail.firstname);
  const [lastname, setlastname] = useState(userdetail.lastname);
  const [phone, setphone] = useState(userdetail.phone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const id = userdetail._id;
  const navigate = useNavigate();

  const updateuserprofile = async (e) => {
    setIsLoading(true);
    setError("");
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/user/updateuser",
        { firstname, lastname, phone, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.info("Details Update Sucessfully .");
        return navigate("/settings");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            onSubmit={updateuserprofile}
            className="border p-4 shadow rounded bg-light"
          >
            <h2 className="mb-4">Update Profile</h2>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstname}
                onChange={(event) => setfirstname(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                onChange={(event) => setlastname(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number:
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(event) => setphone(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
