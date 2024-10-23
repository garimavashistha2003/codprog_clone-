import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import axios from "axios";
import { toast } from "react-toastify";
function ResetPassword() {
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  const { id, token } = useParams();

  const validuser = async () => {
    const res = await fetch(
      `http://localhost:8081/api/v1/user/resetpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.status == 201) {
      console.log("valid user");
    } else {
      return navigate("*");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    setError("");

    try {
      if (password !== confirmPassword) {
        setpassword("");
        setConfirmPassword("");
        toast.error("Password Must Match ..");
        return;
      } else {
        if (password === confirmPassword) {
          const res = await axios.post(
            `http://localhost:8081/api/v1/user/${id}/${token}`,
            { password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data.status == 201) {
            setpassword("");
            setConfirmPassword("");
            toast.info("Password Reset Sucessfully ...");
            navigate("/login");
          } else {
            toast.error("!token expired Generate new Link ..");
          }
        }
      }
    } catch (error) {
      toast.error(error.res.data.message);
      setError(error?.res?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    validuser();
  }, []);

  return (
    // <form className={styles.loginForm} onSubmit={handlesubmit}>
    //   <h1> Reset Your Account Password </h1>

    //   <div className={styles.formGroup}>
    //     <label htmlFor="password">Password</label>

    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       placeholder="Enter  Your New Password  "
    //       value={password}
    //       onChange={(e) => {
    //         setpassword(e.target.value);
    //       }}
    //     />
    //   </div>

    //   <div className={styles.formGroup}>
    //     <label htmlFor="confirmPassword">ConfirmPassword</label>

    //     <input
    //       type="password"
    //       name="confirmPassword"
    //       placeholder="Confirm Your New Password "
    //       id="confirmPassword"
    //       value={confirmPassword}
    //       onChange={(e) => {
    //         setConfirmPassword(e.target.value);
    //       }}
    //     />
    //   </div>

    //   <button type="submit" disabled={isLoading}>
    //     {isLoading ? "Submiting ...." : "Reset Password"}
    //   </button>
    // </form>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm border rounded custom-card">
            <h1 className="text-center mb-4">Reset Your Account Password</h1>
            <form onSubmit={handlesubmit}>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Your New Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Your New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 custom-btn"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Reset Password"}
              </button>
              {/* {message && <p className="text-success text-center mt-3">{message}</p>} */}
              {Error && <p className="text-danger text-center mt-3">{Error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
