import { Grid } from "@mui/material";
import React from "react";

import CardMovie from "./CardMovie";

function Header({ movies, isMovie }) {
  return (
    <>
      <div style={{ height: "2rem" }}></div>

      <Grid container>
        {movies?.length > 0
          ? movies.map((movie) => (
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
                  movie={movie}
                  forFav={false}
                  isMovie={
                    movie.media_type
                      ? movie.media_type === "movie"
                        ? true
                        : false
                      : isMovie
                  }
                />
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
}

export default Header;
