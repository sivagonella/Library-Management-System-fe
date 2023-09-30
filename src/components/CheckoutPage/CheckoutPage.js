import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./CheckoutPage.module.css";
import CartContext from "../../context/cart-context";
import CheckedBook from "./CheckedBook";
import Button from "../UI/Button";

function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const checkoutBooksHandler = () => {};
  // console.log(cartContext.bookList);
  return (
    <Card className={classes.card}>
      <h3>Selected Books</h3>
      <ul>
        {cartContext.bookList.map((book) => {
          return <CheckedBook key={book.id} bookItem={book} />;
        })}
      </ul>
      <div className={classes.actions}>
        <Button
          className={classes.btn}
          type="button"
          onClick={checkoutBooksHandler}
          disabled={cartContext.bookList.length === 0}
        >
          Checkout
        </Button>
      </div>
    </Card>
  );
}

export default CheckoutPage;
