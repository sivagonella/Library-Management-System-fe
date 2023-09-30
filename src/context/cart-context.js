import { createContext, useState } from "react";

const CartContext = createContext({
  bookList: [],
  totalQuantity: 0,
  addBook: (book) => {},
  removeBook: (id) => {},
  findBookQuantity: (id) => {},
  checkoutCart: () => {},
});

export default CartContext;

export const CartProvider = (props) => {
  const [cartState, setCartState] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const addBookHandler = (newBook) => {
    const bookIndex = cartState.findIndex((book) => book.id === newBook.id);
    let currentBooks = cartState;
    if (bookIndex !== -1) {
      let updatedBook = cartState[bookIndex];
      setTotalBooks(
        totalBooks - updatedBook.selectedQuantity + newBook.selectedQuantity
      );
      updatedBook.selectedQuantity = newBook.selectedQuantity;
      currentBooks[bookIndex] = updatedBook;
    } else {
      currentBooks.push(newBook);
      setTotalBooks((state) => {
        return state + newBook.selectedQuantity;
      });
    }
    setCartState(currentBooks);
  };
  const removeBookHandler = (id) => {
    let updatedBooks = cartState.filter((book) => book.id !== id);
    setCartState(updatedBooks);
    setTotalBooks(totalBooks - 1);
  };
  const checkoutBooksHandler = () => {};

  const findBookQuantityHandler = (id) => {
    const bookIndex = cartState.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      const book = cartState[bookIndex];
      return book.selectedQuantity;
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        bookList: cartState,
        totalQuantity: totalBooks,
        addBook: addBookHandler,
        removeBook: removeBookHandler,
        findBookQuantity: findBookQuantityHandler,
        checkoutCart: checkoutBooksHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
