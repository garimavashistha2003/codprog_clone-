import { useState } from "react";
import './LoginForm.css'
import axios from "axios";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, LOGIN_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export async function loginloader() {
  if ("user" in localStorage) {
    const user = JSON.parse(localStorage.getItem("user"));
    if ("email" in user && "access_token" in user) {
      return redirect("/");
    }
  }
  return null;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [Errorr, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setAuth(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));

        navigate("/");
      }
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
          <div className="card p-4 shadow-sm border rounded custom-card ">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">
                Please Enter Your Credentials
              </h1>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email .. "
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password ... "
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/signup">Don't have an account? Signup</Link>
                <Link to="/forgottenpassword">Forgot Password</Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 custom-btn"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Login"}
              </button>
              {Error && <p className="text-danger text-center mt-3">{Error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
