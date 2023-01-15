import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/movies">
        <Button
          sx={{
            width: "10rem",
            height: "3rem",
            color: "black",
            backgroundColor: "#00FF87",
            fontSize: "2rem",
            "&:hover": {
              backgroundColor: "#00FF87",
              color: "white",
            },
          }}
          variant="contained"
        >
          MOVIES
        </Button>
      </Link>
    </div>
  );
}

export default Home;
