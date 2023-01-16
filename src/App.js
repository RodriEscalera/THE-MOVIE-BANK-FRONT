import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./commons/Header";
import HomeMovies from "./components/HomeMovies";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { setUser } from "./store/user";
import Logout from "./components/Logout";
import IndividualMovie from "./commons/IndividualMovie";
import HeaderFavorites from "./commons/HeaderFavorites";
import { setFav } from "./store/favorites";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .post("https://the-movie-bank-back.onrender.com/api/user/me", {
        token: window.localStorage.getItem("token"),
      })
      .then((user) => {
        dispatch(setUser(user.data));
      });
  }, []);

  useEffect(() => {
    const bringAllFavs = async () => {
      const { data } = await axios.get(
        `https://the-movie-bank-back.onrender.com/api/favorites/findFavs/${user.id}`
      );
      dispatch(setFav(data));
    };
    bringAllFavs();
  }, [user.id]);

  return (
    <div className="father">
      <NavBar />

      <Routes>
        {user.id ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies" element={<HomeMovies />} />
            <Route path="/movies/:id" element={<IndividualMovie />} />
            <Route path="/favorites" element={<HeaderFavorites />} />
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<HomeMovies />} />

            <Route path="/movies/:id" element={<IndividualMovie />} />
          </>
        )}
      </Routes>

      <div style={{ height: "3rem" }}></div>
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

*/
