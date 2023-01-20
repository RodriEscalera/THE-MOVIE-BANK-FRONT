import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" sx={{ color: "white", textAlign: "center" }}>
        Welcome to The Movie Bank!!
      </Typography>
      <Link to="/movies">
        <Button
          sx={{
            width: "10rem",
            height: "3rem",
            color: "black",
            marginTop: "2rem",
            backgroundColor: "#00FF87",
            fontSize: "2rem",
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

export default Home;
