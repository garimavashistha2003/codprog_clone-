import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SIGNUP_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export async function signuploader() {
  const user = localStorage.getItem("user");
  if (user) {
    toast.error("you  are already login ");
    return redirect("/");
  }
  return null;
}
function Signup() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [phone, setphone] = useState();
  const [username, setusername] = useState("");
  const [lastname, setlastname] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (password !== confirmPassword) {
        throw Error("Password Must Match");
      }

      const response = await axios.post(
        SIGNUP_URL,
        { email, password, phone, username, firstname, lastname },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAuth(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || error.message);
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm border rounded custom-card">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">Create Your Account</h1>
              {/* // first name */}
              <div className="form-group mb-3">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your First Name"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  required
                />
              </div>
              {/* // lastname */}
              <div className="form-group mb-3">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Last Name"
                  name="lastname"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* //user name */}
              <div className="form-group mb-3">
                <label htmlFor="name">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Username"
                  name="username"
                  id="name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              {/* // phone */}
              <div className="form-group mb-3">
                <label htmlFor="name">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone (Optional)"
                  name="Phone"
                  id="Phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Signup"}
              </button>
              {Error && <p className="text-danger text-center mt-3">{Error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
