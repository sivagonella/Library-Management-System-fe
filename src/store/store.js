import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./cart-slice";
import bookStoreSlice from "./bookStore-slice";

const store = configureStore({
  reducer: { cart: cartReducers, bookStore: bookStoreSlice.reducer },
});

export default store;
