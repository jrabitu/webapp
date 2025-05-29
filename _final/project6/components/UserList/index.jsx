import React from 'react';
import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//import fetchModel from '../../lib/fetchModelData';
import axios from 'axios';
import './styles.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    //to hold fetced user datasss
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
  axios.get("/user/list").then((response) => {
      if (response && response.data) {
        this.setState({ users: response.data }); 
      } else {
        console.error("Invalid data format from /user/list:", response);
      }
    })
    .catch((err) => {
      // Handle error
      console.error("Error fetching user list:", err);
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div className="user-list-container">
        <Typography variant="h6">User List</Typography>
        <List component="nav">
          {users.map((user, index) => (
            <React.Fragment key={user._id}>
              <Link to={`/users/${user._id}`} className="user-link">
                <ListItem button>
                  <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                </ListItem>
              </Link>
              {index < users.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;

// import React from "react";
// import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import fetchModel from "../../lib/fetchModelData";
// import "./styles.css";

// class UserList extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       users: [],
//     };
//   }

//   componentDidMount() {
//     fetchModel("/user/list").then((response)=>{
//       this.setState({
//         users: response.data
//       });
//     }).catch((err)=>{
//       console.error(err);
//     });
//   }

//   render(){
//     return(
//       <div className="user-list-container">
//         <Typography variant="h6">User List</Typography>

//         <List component="nav"> 
//           {this.state.users.map((user, index) => (
//             <React.Fragment key={user._id}>
//               <Link to={`/user/${user._id}`} className="user-link">
//                 <ListItem button>
//                   <ListItemText primary={`${user.first_name} ${user.last_name}`} />
//                 </ListItem>
//               </Link>
//               {index < this.state.user.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </List>
//       </div>
//     );
//   }
// }
// export default UserList;



/**
 * Define UserList, a React component of CS142 Project 5.
 */
// class UserList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <Typography variant="body1">
//           This is the user list, which takes up 3/12 of the window. You might
//           choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
//           and <a href="https://mui.com/components/dividers/">Dividers</a> to
//           display your users like so:
//         </Typography>
//         <List component="nav">
//           <ListItem>
//             <ListItemText primary="Item #1" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//             <ListItemText primary="Item #2" />
//           </ListItem>
//           <Divider />
//           <ListItem>
//             <ListItemText primary="Item #3" />
//           </ListItem>
//           <Divider />
//         </List>
//         <Typography variant="body1">
//           The model comes in from window.cs142models.userListModel()
//         </Typography>
//       </div>
//     );
//   }
// }

// export default UserList;
