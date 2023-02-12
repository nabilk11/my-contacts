import React from "react";
import logo from '../assets/logo.png'

const Header = ({ title }) => {
  return (
    <header className="page-header">
      <img src={logo} alt="" />
      <h2 className="page-title mt-3">{title}</h2>
    </header>
  );
};

export default Header;
