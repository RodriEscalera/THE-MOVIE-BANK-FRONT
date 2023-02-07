import { createAction, createReducer } from "@reduxjs/toolkit";

export const setModalLanguageOpen = createAction("SET_MODAL_LANGUAGE");

const initialState = false;

const reducer = createReducer(initialState, {
  [setModalLanguageOpen]: (state, action) => action.payload,
});

export default reducer;
