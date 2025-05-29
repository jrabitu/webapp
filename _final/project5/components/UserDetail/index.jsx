import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function UserDetail(props) {
  const userId = props.match.params.userId;
  const user = window.cs142models.userModel(userId);

  if (!user) {
    return (
      <Typography variant="body1" color="error">
        User with ID {userId} not found.
      </Typography>
    );
  }

  return (
    <div className="user-detail-container">
     <Typography variant="h4">Detail of user {user.first_name} {user.last_name}</Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Description: {user.description}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Link to={`/photos/${userId}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>View Photos</Button>
      </Link>
    </div>
  );
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
