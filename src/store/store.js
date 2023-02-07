import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import favReducer from "./favorites";
import regionReducer from "./region";
import modalLanguageReducer from "./modalLanguage";
import sideNavReducer from "./sideNav";
const store = configureStore({
  reducer: {
    user: userReducer,
    fav: favReducer,
    region: regionReducer,
    modalLanguage: modalLanguageReducer,
    sideNav: sideNavReducer,
  },
});

export default store;
