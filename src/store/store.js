import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import favReducer from "./favorites";
const store = configureStore({
  reducer: {
    user: userReducer,
    fav: favReducer,
  },
});

export default store;
