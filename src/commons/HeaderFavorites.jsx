import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFav } from "../store/favorites";
import CardMovie from "./CardMovie";

function HeaderFavorites() {
  const [movies, setMovies] = useState([]);
  const user = useSelector((state) => state.user);
  const fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ height: "2rem" }}></div>

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
    </>
  );
}

export default HeaderFavorites;
