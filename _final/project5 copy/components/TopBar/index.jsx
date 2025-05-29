import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

class TopBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      version: "null"
    };
  }

  componentDidMount(){
    fetchModel("/test/info").then((res) => {
      this.setState({version: res.data.__v});
    }).catch((err)=>{console.error(err);
    });
  }

  render(){
    return(
      <AppBar className="cs142-topbar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
           hulan de photo app (v: {this.state.version})
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
