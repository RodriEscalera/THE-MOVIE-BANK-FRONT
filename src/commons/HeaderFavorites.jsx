import {
  Button,
  CircularProgress,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardMovie from "./CardMovie";

function HeaderFavorites() {
  const fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const [estado, setEstado] = useState(false);
  useEffect(() => {
    asyncFunction();
  }, [fav]);
  const asyncFunction = () => {
    return new Promise(function (resolve, reject) {
      setEstado(true);
      setTimeout(resolve, 500);
    }).then(function () {
      setEstado(false);
    });
  };

  return (
    <>
      <div style={{ height: "2rem" }}></div>
      {estado ? (
        <div
          style={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={circleCharge}>
            <CircularProgress />
          </ThemeProvider>
        </div>
      ) : (
        <div>
          {fav.favorites.length > 0 ? (
            <Grid container>
              {fav.favorites?.map((movie) => (
                <Grid
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <CardMovie
                    isMovie={movie.isMovie}
                    movie={movie}
                    forFav={true}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div
              style={{
                width: "100vw",
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3" sx={{ color: "white" }}>
                {"It seems you haven't favorites :("}
              </Typography>
            </div>
          )}
        </div>
      )}
      {/* <Button onClick={asyncFunction}>XD</Button> */}
    </>
  );
}

export default HeaderFavorites;

const circleCharge = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#00FF6E",
    },
  },
});
