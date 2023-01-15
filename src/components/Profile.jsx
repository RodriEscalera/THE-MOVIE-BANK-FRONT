import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUser } from "../store/user";
function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {};
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", marginTop: "2rem" }}>My profile</h1>
        <Link to="/favorites">
          <Button
            sx={{
              marginTop: "2rem",
              backgroundColor: "rgb(36, 210, 111)",
              color: "black",
              borderRadius: "2rem",
              "&:hover": {
                color: "white",
                backgroundColor: "rgb(36, 210, 111)",
              },
              width: "25rem",
            }}
          >
            <Typography variant="h3">FAVORITES</Typography>
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Profile;
