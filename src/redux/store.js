import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";
import compareSlice from "./compareSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite: favoriteSlice,
    compare: compareSlice,
  }
});

export default store;
