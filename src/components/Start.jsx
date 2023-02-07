import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import tmbvideoDG from "../assets/tmbvideoDG.mp4";
import "../styles/Start.css";
import { useDispatch } from "react-redux";
function Start() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <video
        className="background-video"
        src={tmbvideoDG}
        muted
        loop
        autoPlay
      />
      <Typography
        variant="h2"
        sx={{ color: "white", textAlign: "center", zIndex: 2 }}
      >
        Welcome to The Movie Bank!!
      </Typography>
      <Link to="/home">
        <Button
          sx={{
            width: "10rem",
            height: "3rem",
            color: "black",
            marginTop: "2rem",
            backgroundColor: "#00FF87",
            fontSize: "2rem",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "#00FF87",
              color: "white",
            },
          }}
          variant="contained"
        >
          EXPLORE
        </Button>
      </Link>
    </div>
  );
}

export default Start;
