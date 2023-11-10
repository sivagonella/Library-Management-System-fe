import { createSlice } from "@reduxjs/toolkit";

const bookStoreSlice = createSlice({
  name: "bookStore",
  initialState: {
    bookList: [],
    filteredBookList: [],
    filterCriteria: "",
  },
  reducers: {
    initialize(state, action) {
      state.bookList = action.payload;
      if (state.filterCriteria === "") state.filteredBookList = action.payload;
    },
    filterBooks(state, action) {
      state.filterCriteria = action.payload;
      if (action.payload === "") {
        state.filteredBookList = state.bookList;
      } else {
        state.filteredBookList = state.bookList.filter((book) =>
          book.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
  },
});

// export const bookStoreActions = bookStoreSlice.actions;
// export default bookStoreSlice.reducer;

const getBooks = (state) => {
  return state.bookStore.bookList;
};

const getFilteredBooks = (state) => {
  return state.bookStore.filteredBookList;
};

const bookStore = {
  ...bookStoreSlice,
  selectors: { getBooks, getFilteredBooks },
};

export default bookStore;
