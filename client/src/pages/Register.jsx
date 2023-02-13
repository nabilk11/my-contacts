import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = () => {
  // Login Call Context
  const { registerCall, error, setError } = useContext(AuthContext);
  // user registration credentials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Toast Alerts
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.name ||
      !credentials.confirmPassword
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    registerCall(credentials);
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
      <Header title={"Create an Account"} />
      <div className="register-form">
        <form action="" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name" className="form-label mt-4">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Your Name"
              value={credentials.name}
              name="name"
              onChange={handleChange}
              //   required
            />
            <small id="form-sub-text" className="form-text text-muted">
              Name can be a maximum of 30 characters!
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="email-input" className="form-label mt-4">
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
            <label htmlFor="password-input" className="form-label mt-4">
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
          <div className="form-group">
            <label htmlFor="password-input" className="form-label mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="*********"
              value={credentials.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              //   required
            />
            <small id="form-sub-text" className="form-text text-muted">
              Password must be at least 6 characters!
            </small>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Register
          </button>
        </form>
        <span>
          Already have an account? <Link to={"/login"}>Login here!</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
