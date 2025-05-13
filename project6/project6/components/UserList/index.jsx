import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    // fetchModel("/user/list").then((response)=>{
    //   this.setState({users: response.data});
    // }).catch((error)=>{
    //   console.error("fetching user list fail", error);
    // });
    axios.get("/user/list").then((response)=>{
      this.setState({users: response.data});
    }).catch((error)=>{
      console.error("fetching user list fail", error);
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          User List
        </Typography>
        <List component="nav">
          {this.state.users.map((user) => (
            <div key={user._id}>
              <ListItem button component={Link} to={`/users/${user._id}`}>
                <ListItemText primary={`${user.first_name} ${user.last_name}`} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;