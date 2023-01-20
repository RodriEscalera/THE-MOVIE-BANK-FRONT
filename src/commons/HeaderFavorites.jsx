import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardMovie from "./CardMovie";

function HeaderFavorites() {
  const fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ height: "2rem" }}></div>
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
              <CardMovie movie={movie} forFav={true} />
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
    </>
  );
}

export default HeaderFavorites;
