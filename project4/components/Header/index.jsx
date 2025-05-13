import React from "react";
import "./styles.css";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header-title">
          <h1>my header</h1>
          <p className="subtitle">something something.</p>
        </div>
      </header>
    );
  }
}

export default Header;
