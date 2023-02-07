import { Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSideNav } from "../store/sideNav";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

function SideBar() {
  const dispatch = useDispatch();

  const sideNav = useSelector((state) => state.sideNav);
  const handleCloseSideNav = () => {
    dispatch(setSideNav(false));
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "1.2rem",
    marginLeft: "0.3rem",
  };

  const iconsStyle = {
    marginRight: "0.5rem",
    fontSize: "2.4rem",
  };

  const textStyle = {
    marginLeft: "0.5rem",

    fontSize: "2.1rem",
  };

  return (
    <div>
      <Drawer
        className="drawerr"
        open={sideNav.boolean}
        onClose={handleCloseSideNav}
        anchor={"right"}
      >
        <Link
          onClick={() => dispatch(setSideNav(false))}
          style={{ color: "black" }}
          to="/home"
        >
          <div style={containerStyle}>
            <HomeIcon sx={iconsStyle} />
            <Typography sx={textStyle}>HOME</Typography>
          </div>
        </Link>
        <Link
          onClick={() => dispatch(setSideNav(false))}
          style={{ color: "black" }}
          to="/search"
        >
          <div style={containerStyle}>
            <SearchIcon sx={iconsStyle} />
            <Typography sx={textStyle}>SEARCH</Typography>
          </div>
        </Link>
        <Link
          onClick={() => dispatch(setSideNav(false))}
          style={{ color: "black" }}
          to="/profile"
        >
          <div style={containerStyle}>
            <AccountCircleIcon sx={iconsStyle} />
            <Typography sx={textStyle}>PROFILE</Typography>
          </div>
        </Link>
        <Link
          onClick={() => dispatch(setSideNav(false))}
          style={{ color: "black" }}
          to="/settings"
        >
          <div style={containerStyle}>
            <SettingsIcon sx={iconsStyle} />
            <Typography sx={textStyle}>SETTINGS</Typography>
          </div>
        </Link>
      </Drawer>
    </div>
  );
}

export default SideBar;
