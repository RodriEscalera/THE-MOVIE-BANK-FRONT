import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFav, deleteFav } from "../store/favorites";
import { message } from "antd";

function FavoriteButton({ movie, forFav, isMovie }) {
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
        contentId: forFav ? movie.contentId : movie.id,
        isMovie: isMovie,
      }
    );
    setIconFav(data);
    setIsFav(data);
  };
  ////////////////////////////
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Added to you favorites list!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Couldn't be add to your favorites list :(",
    });
  };
  /////////////////////////////
  const handleFav = async () => {
    if (isFav === false) {
      try {
        setIsFav(true);
        const apiFav = await axios.post(
          "https://the-movie-bank-back.onrender.com/api/favorites/addFav",
          {
            userId: user.id,
            contentId: movie.id,
            isMovie: isMovie,
          }
        );
        dispatch(addFav(apiFav.data));
      } catch (err) {
        setIsFav(false);

        console.log("There was an error");
      }
    } else {
      try {
        setIsFav(false);
        dispatch(
          deleteFav(
            forFav
              ? { contentId: movie.contentId, isMovie: movie.isMovie }
              : { contentId: movie.id, isMovie: isMovie }
          )
        );
        const apiFavDelete = await axios.post(
          "https://the-movie-bank-back.onrender.com/api/favorites/deleteFavs",
          {
            contentId: forFav ? parseInt(movie.contentId) : parseInt(movie.id),
            userId: user.id,
            isMovie: isMovie,
          }
        );
      } catch (err) {
        setIsFav(true);

        console.log("There was an error");
      }
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
      {contextHolder}
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
