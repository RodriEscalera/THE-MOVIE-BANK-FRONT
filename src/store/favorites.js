import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFav = createAction("SET_FAV");
export const addFav = createAction("ADD_FAV");
export const deleteFav = createAction("DELETE_FAV");

const initialState = { favorites: [] };

const reducer = createReducer(initialState, {
  [setFav]: (state, action) => {
    return { favorites: action.payload };
  },
  [addFav]: (state, action) => {
    return { ...state, favorites: [...state.favorites, action.payload] };
  },
  [deleteFav]: (state, action) => {
    return {
      ...state,
      favorites: state.favorites.filter(
        (fav) => fav.movieId !== action.payload
      ),
    };
  },
});

export default reducer;
