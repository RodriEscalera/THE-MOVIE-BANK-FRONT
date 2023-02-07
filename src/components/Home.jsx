import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
function Home() {
  const mediaQuery = useMediaQuery("(max-width:447px)");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Typography
        variant={mediaQuery ? "h4" : "h2"}
        sx={{ color: "white", textAlign: "center" }}
      >
        Popular movies:
      </Typography>
      <Link to="/popularmovies">
        <Button variant="contained">Go!</Button>
      </Link>
    </div>
  );
}

export default Home;
