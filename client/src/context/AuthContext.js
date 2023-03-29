import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


useEffect(() => {
    isLoggedIn()
}, [])

// Get Logged In User Details
const isLoggedIn = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`

            }
        })
        console.log(res.data)
        setUser(res.data);
        
    } catch (err) {
        
    }
}

  // Login Call
  const loginCall = async (credentials) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        email: credentials.email,
        password: credentials.password,
      });
      console.log(res.data);
      
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  // Register Call
  const registerCall = async (credentials) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });
    } catch (err) {
      setError(err.response.data.error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ loginCall, registerCall, user, setUser, error, setError }}
    >
      <ToastContainer autoClose={3000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
