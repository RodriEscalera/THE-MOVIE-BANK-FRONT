import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function IndividualMovie() {
  const region = useSelector((state) => state.region);
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const seekMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=35048305f648579c608620afad684324&language=${
          region === "ENGLISH" ? "en-us" : "es-mx"
        }`
      );

      setMovie(data);
    };
    if (region) {
      seekMovie();
    }
  }, [user, region]);
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
              objectFit: "cover",
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
