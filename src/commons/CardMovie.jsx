import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
function CardMovie({ movie, forFav }) {
  // console.log(movie);
  const user = useSelector((state) => state.user);

  return (
    <>
      <div style={{ flexDirection: "column", marginTop: "1rem" }}>
        <Card sx={{ height: "20rem", width: "13rem" }}>
          <CardActionArea>
            {forFav ? (
              <Link to={`/movies/${movie.movieId}`}>
                <CardMedia
                  sx={{ height: "20rem" }}
                  component="img"
                  image={movie.image}
                />
              </Link>
            ) : (
              <Link to={`/movies/${movie.id}`}>
                <CardMedia
                  sx={{ height: "20rem" }}
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </Link>
            )}
          </CardActionArea>
        </Card>
        {user.id ? (
          <FavoriteButton movie={movie} />
        ) : (
          <div style={{ height: "2rem" }}></div>
        )}
      </div>
    </>
  );
}

export default CardMovie;

// <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//       </CardActions>
//     </Card>
