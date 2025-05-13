import React from "react";
import { Typography, Card, CardContent, CardMedia, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import "./styles.css";

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      userName: "", // show user name 
    };
  }

  componentDidMount() {
    this.fetchPhotos();
    this.fetchUserName();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchPhotos();
      this.fetchUserName();
    }
  }

  fetchPhotos() {
    const userId = this.props.match.params.userId;
    // fetchModel(`/photosOfUser/${userId}`).then((res) => {
    //   this.setState({ photos: res.data });
    // });
    axios.get(`/photosOfUser/${userId}`).then((res) => {
      this.setState({ photos: res.data });
    }).catch((error) => {
      console.error("Error fetching photos", error);
    });
  }

  fetchUserName() {
    const userId = this.props.match.params.userId;
    // fetchModel(`/user/${userId}`).then((res) => {
    //   const user = res.data;
    //   this.setState({ userName: `${user.first_name} ${user.last_name}` });
    // });
    axios.get(`/user/${userId}`).then((res) => {
      const user = res.data;
      this.setState({ userName: `${user.first_name} ${user.last_name}` });
    }).catch((error) => {
      console.error("Error fetching user name", error);
    });
  }

  static formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  render() {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          photos of {this.state.userName || "User"}
        </Typography>

        {this.state.photos.map((photo) => (
          <Card key={photo._id} style={{ marginBottom: "20px" }}>
            <CardMedia
              component="img"
              image={`images/${photo.file_name}`}
              alt="User photo"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                uploaded at: {UserPhotos.formatDate(photo.date_time)}
              </Typography>

              {photo.comments && photo.comments.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <Typography variant="subtitle1">comments:</Typography>
                  {photo.comments.map((comment) => (
                    <div key={comment._id} style={{ marginBottom: "10px" }}>
                      <Typography variant="body2">
                        <Link
                          component={RouterLink}
                          to={`/users/${comment.user._id}`}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>{" "}
                        commented at {this.formatDate(comment.date_time)}:
                      </Typography>
                      <Typography variant="body1">{comment.comment}</Typography>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default UserPhotos;