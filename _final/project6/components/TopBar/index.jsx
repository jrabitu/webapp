import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
//import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
import "./styles.css";

class TopBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      version: "null"
    };
  }

  componentDidMount(){
    axios.get("/test/info")
    .then((res) => {
      this.setState({
        version: res.data.__v,
      });
    })
    .catch((err) => {
      console.error("Error fetching version info:", err);
    });
  }

  render(){
    return(
      <AppBar className="cs142-topbar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            photo app (v: {this.state.version})
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
/**
 * Define TopBar, a React component of CS142 Project 5.
 */
// class TopBar extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <AppBar className="cs142-topbar-appBar" position="absolute">
//         <Toolbar>
//           <Typography variant="h5" color="inherit">
//             This is the TopBar component
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     );
//   }
// }

// export default TopBar;
