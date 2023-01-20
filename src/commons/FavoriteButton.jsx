import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFav, deleteFav } from "../store/favorites";

function FavoriteButton({ movie, forFav }) {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const [iconFav, setIconFav] = useState(false);

  /////////////////////////////
  const verifyFav = async () => {
    const { data } = await axios.post(
      "https://the-movie-bank-back.onrender.com/api/favorites/verifyFav",
      {
        userId: user.id,
        movieId: forFav ? movie.movieId : movie.id,
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
          userId: user.id,
          movieId: movie.id,
        }
      );
      dispatch(addFav(apiFav.data));
      setIsFav(true);
    }
    if (isFav === true) {
      const apiFavDelete = await axios.post(
        "https://the-movie-bank-back.onrender.com/api/favorites/deleteFavs",
        {
          movieId: forFav ? movie.movieId : movie.id,
          userId: user.id,
        }
      );
      dispatch(deleteFav(forFav ? movie.movieId : movie.id));
      setIsFav(false);
    }
  };
  /////////////////////////

  //////////////
  useEffect(() => {
    verifyFav();
  }, [user, isFav]);
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
