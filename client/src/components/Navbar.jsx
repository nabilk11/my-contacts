// NAVBAR COMPONENT
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {

  const { user, setUser } = useContext(AuthContext)

  // Logout Function
  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          My Contacts
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to={"/"} >
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/about"}>
                About
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/login"}>
                Login
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/register"}>
                Register
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            {user ? <li className="nav-item">
              <button className="btn btn-danger" onClick={logoutUser}>
                Logout
                <span className="visually-hidden">(current)</span>
              </button>
            </li> : <></>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
