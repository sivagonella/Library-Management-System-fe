import Button from "../UI/Button";
import { Chip } from "@mui/material";
import classes from "./CheckedBook.module.css";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

const CheckedBook = (props) => {
  const cartContext = useContext(CartContext);
  const decrementBookHandler = () => {
    const selectedQuantity = props.bookItem.selectedQuantity;
    if (selectedQuantity > 1) {
      cartContext.addBook({
        ...props.bookItem,
        selectedQuantity: selectedQuantity - 1,
      });
    } else {
      cartContext.removeBook(props.bookItem.id);
    }
  };
  const incrementBookHandler = () => {
    const selectedQuantity = props.bookItem.selectedQuantity;
    cartContext.addBook({
      ...props.bookItem,
      selectedQuantity: selectedQuantity + 1,
    });
  };
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.bookDescription}>
        <span className={classes.bookName}>{props.bookItem.name}</span>
        <div>
          {props.bookItem.authors.map((author) => {
            return (
              <Chip
                style={{ marginRight: "5px" }}
                key={author.id}
                label={author.name}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.actions}>
        <Button type="button" onClick={decrementBookHandler}>
          -
        </Button>
        <strong>{props.bookItem.selectedQuantity}</strong>
        <Button type="button" onClick={incrementBookHandler}>
          +
        </Button>
      </div>
    </li>
  );
};

export default CheckedBook;
