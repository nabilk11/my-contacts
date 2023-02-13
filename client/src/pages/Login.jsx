import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";

const Login = () => {
  // Login Call Context
  const { loginCall, user, error, setError } = useContext(AuthContext);
  // user login credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Toast Alerts
    if (!credentials.email || !credentials.password) {
      toast.error("All fields are required!");
      return;
    }
    loginCall(credentials);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      console.log(error);
      setError(null);
    }
  }, [error, setError]);

  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      <Header title={"Login to Your Account"} />
      <div className="login-form">
        <form action="" onSubmit={handleLogin}>
          <div className="form-group">
            <label for="email-input" className="form-label mt-4">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email@example.com"
              value={credentials.email}
              name="email"
              onChange={handleChange}
              //   required
            />
            <small id="form-sub-text" className="form-text text-muted">
              We will never share your email with anybody!
            </small>
          </div>
          <div className="form-group">
            <label for="password-input" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="*********"
              value={credentials.password}
              name="password"
              onChange={handleChange}
              //   required
            />
            <small id="form-sub-text" className="form-text text-muted">
              Password must be at least 6 characters!
            </small>
          </div>
          <button type="submit" class="btn btn-primary btn-lg">
            Login
          </button>
        </form>
        <span>
          Don't have an account? <Link to={"/register"}>Register here!</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
