import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import axios from "axios";
import noImageFound from "../assets/noImageFound.png";
import PopularityCircle from "./PopularityCircle";
function CardMovie({ movie, forFav, isMovie }) {
  const user = useSelector((state) => state.user);
  const region = useSelector((state) => state.region);

  const [poster, setPoster] = useState("");
  const [movieContainer, setMovieContainer] = useState({});
  const fetchMovie = async () => {
    if (forFav) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${
          movie.contentId
        }?api_key=35048305f648579c608620afad684324&language=${
          region === "ENGLISH" ? "en-us" : "es-mx"
        }`
      );
      setMovieContainer(data);
      setPoster(data.poster_path);
    } else {
      setPoster(movie.poster_path);
    }
  };
  useEffect(() => {
    if (region) {
      fetchMovie();
    }
  }, [user, region]);
  return (
    <>
      <div
        style={{
          flexDirection: "column",
          marginTop: "1rem",
          position: "relative",
        }}
      >
        <div style={{ height: "20rem", width: "13rem" }}>
          <Link
            to={`/${isMovie ? "movies" : "tvshow"}/${
              forFav ? movie.contentId : movie.id
            }`}
          >
            <div>
              <img
                style={{ height: "20rem", borderRadius: "1rem" }}
                src={
                  poster
                    ? `https://image.tmdb.org/t/p/w500${poster}`
                    : noImageFound
                }
              />
              <PopularityCircle
                percentage={
                  movie.vote_average * 10 || movieContainer.vote_average * 10
                }
              />
            </div>
          </Link>
        </div>
        {user.id ? (
          <FavoriteButton movie={movie} forFav={forFav} isMovie={isMovie} />
        ) : (
          <div style={{ height: "2rem" }}></div>
        )}
      </div>
    </>
  );
}

export default CardMovie;
