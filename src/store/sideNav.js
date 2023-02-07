import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSideNav = createAction("SET_SIDENAV");

const initialState = { boolean: false };

const reducer = createReducer(initialState, {
  [setSideNav]: (state, action) => ({ boolean: action.payload }),
});

export default reducer;
