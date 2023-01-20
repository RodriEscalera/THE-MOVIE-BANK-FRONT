import { Card, CardActionArea, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import axios from "axios";
function CardMovie({ movie, forFav }) {
  const user = useSelector((state) => state.user);
  const [poster, setPoster] = useState("");
  const fetchMovie = async () => {
    if (forFav) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=35048305f648579c608620afad684324&language=en-US`
      );

      setPoster(data.poster_path);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      <div style={{ flexDirection: "column", marginTop: "1rem" }}>
        <Card sx={{ height: "20rem", width: "13rem" }}>
          <CardActionArea>
            <Link to={`/movies/${forFav ? movie.movieId : movie.id}`}>
              <CardMedia
                sx={{ height: "20rem" }}
                component="img"
                image={`https://image.tmdb.org/t/p/w500${
                  forFav ? poster : movie.poster_path
                }`}
              />
            </Link>
          </CardActionArea>
        </Card>
        {user.id ? (
          <FavoriteButton movie={movie} forFav={forFav} />
        ) : (
          <div style={{ height: "2rem" }}></div>
        )}
      </div>
    </>
  );
}

export default CardMovie;
