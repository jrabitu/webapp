import React from "react";
import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    const userId = this.props.match.params.userId;
    fetchModel(`/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.error("loading user:", error);
      });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <Typography variant="body1">user details...</Typography>;
    }

    return (
      <div>
        <Typography variant="h5">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>location:</strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>occupation:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>description:</strong> {user.description}
        </Typography>
        <br />
        <Typography variant="body2">
          <Link component={RouterLink} to={`/photos/${user._id}`}>
            see photos of {user.first_name}
          </Link>
        </Typography>
      </div>
    );
  }
}

export default UserDetail;
