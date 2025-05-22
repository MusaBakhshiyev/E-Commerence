import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";
import compareSlice from "./compareSlice";
import chatSlice from "./chatSlice"

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite: favoriteSlice,
    compare: compareSlice,
    chat: chatSlice,
  }
});

export default store;
