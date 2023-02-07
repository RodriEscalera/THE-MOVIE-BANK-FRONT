import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../commons/Header";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const region = useSelector((state) => state.region);
  const user = useSelector((state) => state.user);

  console.log(region);
  useEffect(() => {
    const popMov = async () => {
      const popularMoviesReq = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=35048305f648579c608620afad684324&language=${
          region === "ENGLISH" ? "en-us" : "es-mx"
        }&page=1`
      );

      setMovies(popularMoviesReq.data.results);
    };
    if (region) {
      popMov();
    }
  }, [user, region]);

  return (
    <>
      <Typography
        sx={{ textAlign: "center", color: "white", marginTop: "2rem" }}
        variant="h3"
      >
        POPULAR MOVIES:
      </Typography>
      <Header isMovie={true} movies={movies} />
    </>
  );
}

export default PopularMovies;
