import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { message } from "antd";
import Header from "../commons/Header";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function SearchMovies() {
  const [inputSearch, setInputSearch] = useState("");
  const [titles, setTitle] = useState([]);
  const [options, setOptions] = useState([]);
  const user = useSelector((state) => state.user);
  const region = useSelector((state) => state.region);
  const sevenHundredPixels = useMediaQuery("(max-width:724px)");
  const fourHundredPixels = useMediaQuery("(max-width:402px)");

  const handleInput = async (e) => {
    if (region) {
      setAppear(true);
      setInputSearch(e.target.value);
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=35048305f648579c608620afad684324&language=${
          region === "ENGLISH" ? "en-us" : "es-mx"
        }&query=${e.target.value}&page=1&include_adult=true`
      );

      setOptions(
        result.data.results
          .slice(0, 7)
          .map((res) => res)
          .filter((element) => element !== undefined)
      );
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Complete the field to search something",
      duration: 1.5,
    });
  };

  const searchMovies = async (e) => {
    if (region) {
      e.preventDefault();
      setAppear(false);

      if (inputSearch.length === 0) {
        warning();
      } else {
        const result = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=35048305f648579c608620afad684324&language=${
            region === "ENGLISH" ? "en-us" : "es-mx"
          }&query=${inputSearch}&page=1&include_adult=true`
        );
        setTitle(
          result.data.results.filter(
            (element) => element.poster_path || element.poster_path !== null
          )
        );
      }
    }
  };
  const [appear, setAppear] = useState(false);
  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          marginTop: "3rem",
        }}
      >
        <Typography
          variant={
            sevenHundredPixels && !fourHundredPixels
              ? "h3"
              : fourHundredPixels
              ? "h4"
              : "h2"
          }
          sx={{ color: "white", textAlign: "center" }}
        >
          Search movies...
        </Typography>

        <form onSubmit={searchMovies}>
          <ThemeProvider theme={styledTheme}>
            <TextField
              onChange={handleInput}
              variant="filled"
              sx={{
                width:
                  sevenHundredPixels && !fourHundredPixels
                    ? "20rem"
                    : fourHundredPixels
                    ? "15rem"
                    : "40rem",
              }}
              label="Search something..."
              autoComplete="off"
            />

            <Button
              type="submit"
              onClick={searchMovies}
              variant="contained"
              sx={{ backgroundColor: "#00FF6E" }}
            >
              <SearchIcon sx={{ color: "white", fontSize: "2rem" }} />
            </Button>
          </ThemeProvider>
        </form>
        <div
          style={{
            width:
              sevenHundredPixels && !fourHundredPixels
                ? "20rem"
                : fourHundredPixels
                ? "20rem"
                : "40rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            position: "relative",
          }}
        >
          {appear && (
            <IconButton
              onClick={() => setAppear(false)}
              sx={{ left: "90%", position: "absolute" }}
            >
              <CloseIcon sx={{ color: "#00FF6E" }} />
            </IconButton>
          )}
          {appear && options.length > 0
            ? options.map((name) => (
                <Link
                  style={{ color: "black" }}
                  to={
                    name.media_type === "movie"
                      ? `/movies/${name.id}`
                      : `/tvshow/${name.id}`
                  }
                >
                  <p className="resultsSearch">{name.title || name.name}</p>
                </Link>
              ))
            : null}
        </div>

        {titles.length > 0 ? <Header movies={titles} /> : null}
      </div>
    </>
  );
}

export default SearchMovies;

const styledTheme = createTheme({
  palette: {
    primary: {
      main: "#00FF6E",
    },
    secondary: {
      main: "#00FF6E",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});
