import React, { useState } from "react";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function PopularityCircle({ percentage }) {
  const fav = useSelector((state) => state.fav);

  const [circleColor, setCircleColor] = useState("");
  useEffect(() => {
    if (Math.round(percentage) < 30) {
      setCircleColor("#EE2020");
    }
    if (Math.round(percentage) > 29 && Math.round(percentage) < 70) {
      setCircleColor("#ECD024");
    }
    if (Math.round(percentage) >= 70) {
      setCircleColor("#43EC24");
    }
  }, [percentage]);
  const circleTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: circleColor || "#FFFFFF",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  return (
    <>
      {percentage ? (
        <div
          style={{
            position: "absolute",
            marginTop: "-3.5rem",
            marginLeft: "10rem",
            backgroundColor: "#2E2E2E",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={circleTheme}>
            <CircularProgress
              variant="determinate"
              value={Math.round(percentage)}
            />
          </ThemeProvider>

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="p" sx={{ color: "white", fontSize: "0.9rem" }}>
              {percentage <= 0 ? 0 : `${Math.round(percentage)}%`}
            </Typography>
          </Box>
        </div>
      ) : null}
    </>
  );
}

export default PopularityCircle;
