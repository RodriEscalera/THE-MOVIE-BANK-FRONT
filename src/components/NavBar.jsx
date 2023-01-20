import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
function NavBar() {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Link to="/">
          <Button sx={{ fontSize: "1.3rem", color: "white" }}>
            THE MOVIE BANK
          </Button>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {user.id === null ? (
          <>
            <Link to="/login">
              <Button sx={{ color: "white" }}>LOGIN</Button>
            </Link>
            <Link to="/signup">
              <Button sx={{ color: "white" }}>SIGN UP</Button>
            </Link>
          </>
        ) : (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
            >
              {user.name}
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                  {
                    backgroundColor: "#24D26F",
                  },
              }}
            >
              <Link to="/profile">
                <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                  Profile
                </MenuItem>
              </Link>

              <Link to="/logout">
                <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                  Logout
                </MenuItem>
              </Link>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

/*



import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}






*/
