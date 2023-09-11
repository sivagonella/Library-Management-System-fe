import React, { useState } from "react";
import classes from "./AddBook.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [numberOfBooks, setNumberOfBooks] = useState();
  const [authors, setAuthors] = useState([
    {
      authorName: "",
    },
  ]);

  const addBookHandler = () => {
    fetch("http://localhost:8080/demo/books", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookName: bookName,
        authorNames: authors,
        numberOfBooks: numberOfBooks,
      }),
    }).then(async (res) => {
      console.log(await res.json());
    });
    setBookName("");
    setAuthors([{ authorName: "" }]);
    setNumberOfBooks(0);
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>Add Book</h3>
        <Input
          className={classes.input}
          label="Book name"
          type="text"
          id="bookName"
          value={bookName}
          onChange={(id, value) => {
            setBookName(value);
          }}
        />
        <br></br>
        {authors.map((author, index) => (
          <div className={classes["author-div"]}>
            <Input
              type="text"
              key={index}
              id="authorNames"
              label="Author name"
              className={`${classes.author}`}
              value={author.authorName}
              onChange={(id, value) => {
                let newAuthors = [...authors];
                newAuthors[index].authorName = value;
                setAuthors(newAuthors);
              }}
            />
            <Button
              id="addAuthorButton"
              className={classes["add-author"]}
              onClick={addAuthor}
            >
              +
            </Button>
          </div>
        ))}

        <br></br>
        <Input
          type="number"
          label="Number of books"
          className={classes.input}
          id="numberOfBooks"
          value={numberOfBooks}
          onChange={(id, value) => setNumberOfBooks(value)}
        />
        <div style={{ textAlign: "center" }}>
          <Button type="submit" onClick={addBookHandler}>
            Add book
          </Button>
        </div>
      </form>
    </Card>
  );

  function addAuthor() {
    setAuthors([...authors, { authorName: "" }]);
  }
}
