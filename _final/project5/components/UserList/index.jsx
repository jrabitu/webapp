import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchedUsers = window.cs142models.userListModel();
    setUsers(fetchedUsers);
  }, []);

  return (
    <div className="user-list-container">
      <Typography variant="h6">User List</Typography>
      <List component="nav">
        {users.map((user, index) => (
          <React.Fragment key={user._id}>
            <Link to={`/users/${user._id}`} className="user-list-link" style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default UserList;



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
