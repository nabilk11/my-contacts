import { Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import { AuthContextProvider } from "./context/AuthContext";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Body>
    </AuthContextProvider>
  );
}

export default App;
