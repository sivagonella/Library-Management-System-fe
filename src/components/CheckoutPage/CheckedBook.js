import Button from "../UI/Button";
import { Chip } from "@mui/material";
import classes from "./CheckedBook.module.css";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const CheckedBook = (props) => {
  const cartContext = useContext(CartContext);
  const decrementBookHandler = () => {
    const quantity = props.bookItem.quantity;
    if (quantity > 1) {
      cartContext.addBook({ ...props.bookItem, quantity: quantity - 1 });
    } else {
      cartContext.removeBook(props.bookItem.bookID);
    }
  };
  const incrementBookHandler = () => {
    const quantity = props.bookItem.quantity;
    cartContext.addBook({ ...props.bookItem, quantity: quantity + 1 });
  };
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.bookDescription}>
        <span className={classes.bookName}>{props.bookItem.bookName}</span>
        <div>
          {props.bookItem.authorNames.map((author) => {
            return (
              <Chip
                style={{ marginRight: "5px" }}
                key={author.authorID}
                label={author.authorName}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.actions}>
        <Button type="button" onClick={decrementBookHandler}>
          -
        </Button>
        <strong>{props.bookItem.quantity}</strong>
        <Button type="button" onClick={incrementBookHandler}>
          +
        </Button>
      </div>
    </li>
  );
};

export default CheckedBook;
