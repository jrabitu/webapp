import React from "react";
import { Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function UserPhotos(props) {
  const userId = props.match.params.userId;
  const photos = window.cs142models.photoOfUserModel(userId);
  const user = window.cs142models.userModel(userId);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1">No photos found for this user.</Typography>
    );
  }

  return (
    <div className="user-photos-container">
      <Typography variant="h4">Photos of user {user.first_name} {user.last_name}</Typography>
      {photos.map(photo => (
        <div key={photo._id} className="photo-card">
          <img
            src={`images/${photo.file_name}`}
            alt="user"
            className="photo-image"
          />
          <Typography variant="body2" color="textSecondary">
            Date: {new Date(photo.date_time).toLocaleString()}
          </Typography>
          <div className="photo-comments">
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map(comment => (
                <div key={comment._id} className="comment">
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>{" "}
                    ({new Date(comment.date_time).toLocaleString()}):
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2">No comments.</Typography>
            )}
          </div>
          <Divider style={{ margin: "10px 0" }} />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;


/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
// class UserPhotos extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <Typography variant="body1">
//         This should be the UserPhotos view of the PhotoShare app. Since it is
//         invoked from React Router the params from the route will be in property
//         match. So this should show details of user:
//         {this.props.match.params.userId}. You can fetch the model for the user
//         from window.cs142models.photoOfUserModel(userId):
//         <Typography variant="caption">
//           {JSON.stringify(
//             window.cs142models.photoOfUserModel(this.props.match.params.userId)
//           )}
//         </Typography>
//       </Typography>
//     );
//   }
// }

// export default UserPhotos;
