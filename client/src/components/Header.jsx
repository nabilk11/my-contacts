import React from "react";

const Header = ({ title }) => {
  return (
    <header className="page-header">
      <h2 className="page-title">{title}</h2>
    </header>
  );
};

export default Header;
