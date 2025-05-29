import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
//import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
import "./styles.css";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    axios.get('/user/'+userId).then((response =>{
      if(response && response.data){
        this.setState({user: response.data});
      }else{
        console.error("user detail iin error: ", response);
      }
    })).catch((err) => {
      console.error("Error fetching user detail:", err);
    });
  }

  componentDidUpdate(prevProps) {
  if (prevProps.match.params.userId !== this.props.match.params.userId) {
    const userId = this.props.match.params.userId;
    axios.get('/user/' + userId)
      .then(response => {
        if (response && response.data) {
          this.setState({ user: response.data });
        } else {
          console.error("Invalid data format from /user/:id:", response);
        }
      }
      ).catch(err => console.error(err));
  }
}

  render() {
    const { user } = this.state;
    if (!user) {
      return <Typography>Loading user...</Typography>;
    }

    return (
      <div className="user-detail-container">
        <Typography variant="h4">{user.first_name} {user.last_name}</Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body1">Description: {user.description}</Typography>
        <Typography variant="body1">Occupation: {user.occupation}</Typography>
        <Link to={`/photos/${user._id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>View Photos</Button>
        </Link>
      </div>
    );
  }
}

export default UserDetail;


/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
// class UserDetail extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Typography variant="body1">
//         This should be the UserDetail view of the PhotoShare app. Since it is
//         invoked from React Router the params from the route will be in property
//         match. So this should show details of user:
//         {this.props.match.params.userId}. You can fetch the model for the user
//         from window.cs142models.userModel(userId).
//       </Typography>
//     );
//   }
// }

// export default UserDetail;
