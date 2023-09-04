import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    bookList: [],
    totalQuantity: 0,
  },
  reducers: {
    addBookToCart(state, action) {
      const newBook = action.payload;
      state.totalQuantity++;
      const existingBook = state.bookList.find(
        (item) => item.bookId === newBook.bookId
      );
      if (existingBook) {
        existingBook.quantity++;
      } else {
        state.bookList.push(newBook);
      }
    },
    removeBookFromCart(state, action) {
      const bookId = action.payload;
      state.totalQuantity--;
      const existingBook = state.bookList.find(
        (item) => item.bookId === bookId
      );
      if (existingBook.quantity === 1) {
        state.bookList = state.bookList.filter(
          (item) => item.bookId !== bookId
        );
      } else {
        existingBook.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
