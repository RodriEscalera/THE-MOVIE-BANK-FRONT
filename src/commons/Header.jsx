import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CardMovie from "./CardMovie";

function Header() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const popMov = async () => {
      const popularMoviesReq = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=35048305f648579c608620afad684324&language=en-US&page=1`
      );

      setMovies(popularMoviesReq.data.results);
    };

    popMov();
  }, []);

  return (
    <>
      <div style={{ height: "2rem" }}></div>

      <Grid container>
        {movies.map((movie) => (
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
            <CardMovie movie={movie} forFav={false} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Header;
