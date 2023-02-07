import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./styles/App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Start from "./components/Start";
import { setUser } from "./store/user";
import Logout from "./components/Logout";
import IndividualMovie from "./commons/IndividualMovie";
import HeaderFavorites from "./commons/HeaderFavorites";
import { setFav } from "./store/favorites";
import PopularMovies from "./components/PopularMovies";
import SearchMovies from "./components/SearchMovies";
import IndividualTvShow from "./commons/IndividualTvShow";
import { setRegion } from "./store/region";
import ModalLanguage from "./commons/ModalLanguage";
import { setModalLanguageOpen } from "./store/modalLanguage";
import Settings from "./components/Settings";
function App() {
  const regionLocal = window.localStorage.getItem("region");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fav = useSelector((state) => state.fav);
  const region = useSelector((state) => state.region);

  useEffect(() => {
    if (regionLocal === null) {
      dispatch(setModalLanguageOpen(true));
    }
    if (window.localStorage.getItem("region") !== null) {
      dispatch(setRegion(window.localStorage.getItem("region")));
    }
    axios
      .post("https://the-movie-bank-back.onrender.com/api/user/me", {
        token: window.localStorage.getItem("token"),
      })
      .then((user) => {
        dispatch(setUser(user.data));
      })
      .catch((error) => {
        console.warn("Server Error");
      });
  }, []);

  useEffect(() => {
    if (user.id !== null) {
      const bringAllFavs = async () => {
        const { data } = await axios.get(
          `https://the-movie-bank-back.onrender.com/api/favorites/findFavs/${user.id}`
        );
        dispatch(setFav(data));
      };
      bringAllFavs();
    }
  }, [user]);
  return (
    <div className="father">
      <div className="cover"></div>
      <NavBar />

      <Routes>
        {user.id ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies/:id" element={<IndividualMovie />} />
            <Route path="/tvshow/:id" element={<IndividualTvShow />} />
            <Route path="/popularmovies" element={<PopularMovies />} />
            <Route path="/favorites" element={<HeaderFavorites />} />
            <Route path="/" element={<Start />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Start />} />
            <Route path="/home" element={<Home />} />
            <Route path="/popularmovies" element={<PopularMovies />} />
            <Route path="/movies/:id" element={<IndividualMovie />} />
            <Route path="/tvshow/:id" element={<IndividualTvShow />} />
            <Route path="/searchMovies" element={<SearchMovies />} />
          </>
        )}
      </Routes>
      <ModalLanguage />
    </div>
  );
}

export default App;

/*
{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }



        https://the-movie-bank-back.onrender.com
        http://localhost:3001
*/
