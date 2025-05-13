import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { withRouter } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: "",
      headerText: "",
    };
  }

  componentDidMount() {
    fetchModel("/test/info").then((response) => {
      this.setState({ version: response.data.__v });
    });

    this.updateHeaderText(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateHeaderText(this.props.location.pathname);
    }
  }

  updateHeaderText(path) {
    if (path.startsWith("/photos/") || path.startsWith("/users/")) {
      const userId = path.split("/")[2];
      fetchModel(`/user/${userId}`).then((res) => {
        const user = res.data;
        const text = path.startsWith("/photos/")
          ? `Photos of ${user.first_name} ${user.last_name}`
          : `${user.first_name} ${user.last_name}`;
        this.setState({ headerText: text });
      });
    } else if (path === "/users") {
      this.setState({ headerText: "User List" });
    } else {
      this.setState({ headerText: "" });
    }
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit">
            Khulan 👩🏻‍💻
          </Typography>
          <div>
            <Typography variant="h6" color="inherit">
              {this.state.headerText}
            </Typography>
            <Typography variant="caption" color="inherit">
              v{this.state.version}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);
