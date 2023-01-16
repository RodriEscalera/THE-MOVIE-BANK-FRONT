import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function IndividualMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const seekMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=35048305f648579c608620afad684324&language=en-US`
      );

      setMovie(data);
    };
    seekMovie();
  }, []);
  // console.log(movie);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        sx={{
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          width: "60vw",
        }}
        container
      >
        <Grid sx={{ textAlign: "center" }} xs={12} sm={6} md={6} lg={6} item>
          <img
            style={{
              borderRadius: "3%",
              height: "25rem",
              width: "16rem",
            }}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} sx={{ color: "white" }} item>
          <h1 style={{ textAlign: "center" }}>{movie.title}</h1>
          <p>{movie.overview}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default IndividualMovie;

/*

        xs={12}
        sm={6}
        md={4}
        lg={6}









  <div
      style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        marginTop: "3rem",
        position: "relative",
      }}
    >
      <img
        style={{
          marginRight: "55rem",
          width: "20%",
          borderRadius: "3%",
          marginLeft: "5rem",
        }}
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      />
      <div style={{ marginLeft: "5rem", width: "40vw", position: "absolute" }}>
        <h1 style={{ fontSize: "2rem" }}>{movie.title}</h1>
        <p style={{ width: "40vw" }}>{movie.overview}</p>
      </div>
    </div>

*/
