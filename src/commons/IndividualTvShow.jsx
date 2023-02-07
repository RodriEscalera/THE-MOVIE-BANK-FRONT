import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function IndividualTvShow() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState({});
  const region = useSelector((state) => state.region);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const seekTvShow = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=35048305f648579c608620afad684324&language=${
          region === "ENGLISH" ? "en-us" : "es-mx"
        }`
      );

      setTvShow(data);
    };
    if (region) {
      seekTvShow();
    }
  }, [user, region]);
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
            src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
          />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} sx={{ color: "white" }} item>
          <h1 style={{ textAlign: "center" }}>{tvShow.name}</h1>
          <p>{tvShow.overview}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default IndividualTvShow;
