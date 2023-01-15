import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFav, deleteFav, setFav } from "../store/favorites";

function FavoriteButton({ movie }) {
  const user = useSelector((state) => state.user);
  const fav = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const [iconFav, setIconFav] = useState(false);

  /////////////////////////////
  const verifyFav = async () => {
    const { data } = await axios.post(
      "https://the-movie-bank-back.onrender.com/api/favorites/verifyFav",
      {
        userId: user.id,
        title: movie.title,
      }
    );
    setIconFav(data);
    setIsFav(data);
  };
  ////////////////////////////

  /////////////////////////////
  const handleFav = async () => {
    if (isFav === false) {
      const apiFav = await axios.post(
        "https://the-movie-bank-back.onrender.com/api/favorites/addFav",
        {
          title: movie.title,
          userId: user.id,
          movieId: movie.id,
          image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }
      );
      dispatch(addFav(apiFav.data));
      setIsFav(true);
      console.log("FAAAAV", fav);
    }
    if (isFav === true) {
      const apiFavDelete = await axios.post(
        "https://the-movie-bank-back.onrender.com/api/favorites/deleteFavs",
        {
          title: movie.title,
          userId: user.id,
        }
      );
      dispatch(deleteFav(movie.movieId || movie.id));
      console.log(movie);
      setIsFav(false);
    }
  };
  /////////////////////////

  //////////////
  useEffect(() => {
    verifyFav();
  }, [user.id, isFav]);
  //////////////

  return (
    <>
      <Button onClick={handleFav}>
        {iconFav ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "red" }} />
        )}
      </Button>
    </>
  );
}

export default FavoriteButton;
