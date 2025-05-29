import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./styles.css";

function TopBar({ context }) {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const info = window.cs142models.schemaInfo();
    setVersion(info.__v);
  }, []);

  return (
    <AppBar className="cs142-topbar-appBar" position="fixed">
      <Toolbar>
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
          My Photo App (v{version})
        </Typography>
            {context && (
      <Typography variant="body1" color="inherit">
        {context}
      </Typography>
            )}
      </Toolbar>
    </AppBar>
  );
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
