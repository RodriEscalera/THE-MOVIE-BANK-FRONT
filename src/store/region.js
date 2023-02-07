import { createAction, createReducer } from "@reduxjs/toolkit";

export const setRegion = createAction("SET_REGION");

const initialState = "";

const reducer = createReducer(initialState, {
  [setRegion]: (state, action) => action.payload,
});

export default reducer;
