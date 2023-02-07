import {
  AppBar,
  Box,
  Button,
  createTheme,
  IconButton,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import { setSideNav } from "../store/sideNav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const dispatch = useDispatch();
  const sideNav = useSelector((state) => state.sideNav);
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileResolution = useMediaQuery("(max-width:500px)");
  const handleOpenSideNav = () => {
    dispatch(setSideNav(true));
  };
  return (
    <AppBar
      sx={{
        backgroundColor: "black",
        width: "100vw",
        height: "4rem",
        position: "static",
      }}
    >
      <Toolbar>
        {mobileResolution && <Box sx={{ flexGrow: 1 }} />}

        <Link to="/home">
          <Button sx={{ fontSize: "1.3rem", color: "white" }}>
            THE MOVIE BANK
          </Button>
        </Link>
        {mobileResolution ? (
          <>
            <Box sx={{ flexGrow: 1 }} />

            <IconButton
              onClick={handleOpenSideNav}
              sx={{ position: "absolute", left: "87%", color: "white" }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <SideBar />
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }} />
            {user.id === null ? (
              <>
                <Link to="/search">
                  <SearchIcon sx={{ color: "white", marginRight: "0.5rem" }} />
                </Link>

                <Link to="/login">
                  <Button sx={{ color: "white" }}>LOGIN</Button>
                </Link>
                <Link to="/signup">
                  <Button sx={{ color: "white" }}>SIGN UP</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/search">
                  <SearchIcon sx={{ color: "white", marginRight: "0.5rem" }} />
                </Link>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "white" }}
                >
                  <AccountCircleIcon sx={{ color: "white" }} />
                </IconButton>
                <ThemeProvider theme={theme}>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .css-177ic5c": {
                        backgroundColor: "#24D26F",
                      },
                    }}
                  >
                    <Link to="/profile">
                      <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Profile
                      </MenuItem>
                    </Link>

                    <Link to="/settings">
                      <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Settings
                      </MenuItem>
                    </Link>
                    <Link to="/logout">
                      <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Logout
                      </MenuItem>
                    </Link>
                  </Menu>
                </ThemeProvider>
              </>
            )}{" "}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

const theme = createTheme({
  palette: {
    primary: {
      main: "#24D26F",
    },
  },
});
