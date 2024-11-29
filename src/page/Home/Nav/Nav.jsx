import React from "react";
import { Box, AppBar, Typography, Toolbar } from "@mui/material";
import { useDynamicStlyes } from "../../../components/Styles";
import { NavBar_1 } from "../../../assets/Variable/TextVariable";
function NavBar() {
  const styles = useDynamicStlyes();
  return (
    <AppBar position="static" color="inherit" sx={styles.navBar}>
      <Toolbar>
        <Box>
          <Typography
            variant="h6"
            sx={{ ...NavBar_1, ...styles.textColor }}
          >
            Like - DisLike
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
