import { useState } from "react";
import classes from "./BookInput.module.css";

const BookInput = (props) => {
  const [invalidInput, setInvalidInput] = useState(false);
  const inputChangeHandler = (e) => {
    if (+e.target.value > props.numOfBooks) {
      setInvalidInput(true);
    } else setInvalidInput(false);
  };
  return (
    <>
      <input
        className={`${classes.input} ${invalidInput ? classes.invalid : ""}`}
        type="number"
        min="0"
        max={props.numOfBooks}
        step={1}
        onChange={inputChangeHandler}
        onBlur={(event) => {
          props.onBlur(event.target.value, props.book);
        }}
      />
    </>
  );
};

export default BookInput;
