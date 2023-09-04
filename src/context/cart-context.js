import { createContext, useState } from "react";

const CartContext = createContext({
  bookList: [],
  totalQuantity: 0,
  addBook: (book) => {},
  removeBook: (id) => {},
  checkoutCart: () => {},
});

export default CartContext;

export const CartProvider = (props) => {
  const [cartState, setCartState] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const addBookHandler = (newBook) => {
    const bookIndex = cartState.findIndex(
      (book) => book.bookID === newBook.bookID
    );
    let currentBooks = cartState;
    if (bookIndex !== -1) {
      let updatedBook = cartState[bookIndex];
      setTotalBooks(totalBooks - updatedBook.quantity + newBook.quantity);
      updatedBook.quantity = newBook.quantity;
      currentBooks[bookIndex] = updatedBook;
    } else {
      currentBooks.push(newBook);
      setTotalBooks((state) => {
        return state + newBook.quantity;
      });
    }
    setCartState(currentBooks);
  };
  const removeBookHandler = (id) => {
    let updatedBooks = cartState.filter((book) => book.bookID !== id);
    setCartState(updatedBooks);
    setTotalBooks(totalBooks - 1);
  };
  const checkoutBooksHandler = () => {};
  return (
    <CartContext.Provider
      value={{
        bookList: cartState,
        totalQuantity: totalBooks,
        addBook: addBookHandler,
        removeBook: removeBookHandler,
        checkoutCart: checkoutBooksHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
