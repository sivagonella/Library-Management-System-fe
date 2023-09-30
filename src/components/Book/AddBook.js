import React, { useEffect, useState } from "react";
import classes from "./AddBook.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Select from "react-select";

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [numberOfBooks, setNumberOfBooks] = useState();
  // const [authors, setAuthors] = useState([
  //   {
  //     authorName: "",
  //   },
  // ]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState();

  useEffect(() => {
    const fetchData = () =>
      fetch("http://localhost:8080/lms/authors").then(async (res) => {
        // console.log(await res.json());
        const authorData = await res.json();
        authorData.map((author) =>
          setAuthors((state) => [
            ...state,
            { id: author.id, label: author.name, value: author.id },
          ])
        );
      });
    fetchData();
  }, []);

  const addBookHandler = () => {
    fetch("http://localhost:8080/lms/books", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName,
        authorIds: selectedAuthors,
        quantity: numberOfBooks,
      }),
    }).then(async (res) => {
      // console.log(await res.json());
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
        <div className={`${classes.select} ${classes.input}`}>
          <label>Author names</label>
          <Select
            isMulti
            name="authors"
            options={authors}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(events) => {
              // console.log(events.map((event) => event.id));
              setSelectedAuthors(events.map((event) => event.id));
            }}
          />
        </div>
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

  // function addAuthor() {
  //   setAuthors([...authors, { authorName: "" }]);
  // }
}
