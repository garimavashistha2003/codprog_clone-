import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function ChangePassword() {
  const { userdetail, auth } = useAuth();
  const [oldpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const email = auth?.email;
    console.log(email);

    if (newpassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/user/changepassword",
        { oldpassword, newpassword, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.info("Password update Sucessfully");
        navigate("/settings");
      }
      console.log(response);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Current Password is Incorrect");
        setCurrentPassword("");
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleChangePassword}
            className="border p-4 shadow rounded bg-light"
          >
            <h2 className="mb-4">Change Password</h2>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={oldpassword}
                placeholder="Enter Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Enter New Password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                value={confirmNewPassword}
                placeholder="Confirm Password  "
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
