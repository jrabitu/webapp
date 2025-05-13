import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link } from "react-router-dom";
import Example from "./components/Example";
import States from "./components/States";
import "./styles/main.css";
import Header from "./components/Header";

class View extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <nav className="toolbar">
            <Link className="nav-link" to="/example">Example view</Link>
            <Link className="nav-link" to="/states">States view</Link>
          </nav>

          <div className="main-view">
            <Route path="/example" component={Example} />
            <Route path="/states" component={States} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<View/>,  document.getElementById("reactapp"));