import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
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
    console.log(credentials)
  };

  return (
    <div>
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
              required
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
              required
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
