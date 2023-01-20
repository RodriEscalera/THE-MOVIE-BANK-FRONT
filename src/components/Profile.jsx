import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setUser } from "../store/user";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {};
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1 style={{ color: "white", marginTop: "2rem", textAlign: "center" }}>
        My profile
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "60vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" style={{ color: "white" }}>
          User name: {user.name}
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          Email: {user.email}
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          Id: {user.id}
        </Typography>

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
              width: "20rem",
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
