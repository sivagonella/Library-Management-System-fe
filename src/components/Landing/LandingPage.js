import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import classes from "./LandingPage.module.css";
import { Chip } from "@mui/material";
// import styled from "styled-components";
import { Card } from "react-bootstrap";
import BookInput from "../Book/BookInput";
import Button from "../UI/Button";

const LandingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returningBooks, setReturningBooks] = useState([]);
  const userId = Cookies.get("userId");
  useEffect(() => {
    fetch("http://localhost:8080/lms/getCheckedBooks/userId=" + userId).then(
      async (res) => {
        const result = await res.json();
        setBorrowedBooks(result.checkedBookDTOs);
        console.log(result.checkedBookDTOs);
      }
    );
  }, [userId]);

  const returnQuantityChangeHandler = (transactionUUID, value, book) => {
    const bookIndex = returningBooks.findIndex(
      (existingBook) => existingBook.transactionUUID === transactionUUID
    );
    let currentBooks = returningBooks;
    if (bookIndex !== -1) {
      let updatedBook = currentBooks[bookIndex];
      updatedBook.returnedQuantity = +value;
      currentBooks[bookIndex] = updatedBook;
    } else {
      currentBooks.push({
        transactionUUID: transactionUUID,
        bookId: book.id,
        returnedQuantity: +value,
      });
    }
    setReturningBooks(currentBooks);
    console.log(returningBooks);
  };

  const returnBookHandler = () => {
    fetch("http://localhost:8080/lms/returnBooks/userId=" + userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        returnedBookDTOList: returningBooks,
      }),
    }).then(async (res) => {
      console.log(await res.json());
    });
  };

  return (
    <Card className={classes.card}>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author Names</th>
            <th>Borrowed Quantity</th>
            <th>Borrowed Date</th>
            <th>Return Date</th>
            <th>Return Quantity</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((bookDetail) => {
            return (
              <tr key={bookDetail.transactionUUID}>
                <td>{bookDetail.libraryBook.name}</td>
                <td>
                  {bookDetail.libraryBook.authors.map((author) => (
                    <Chip
                      key={author.id}
                      style={{ marginRight: "5px" }}
                      label={author.name}
                    />
                  ))}
                </td>
                <td>{bookDetail.quantity}</td>
                <td>{bookDetail.borrowedDate}</td>
                <td>{bookDetail.returnDate}</td>
                <td>
                  <BookInput
                    id={bookDetail.libraryBook.id}
                    book={bookDetail.libraryBook}
                    value={
                      returningBooks.find(
                        (book) => book.bookId === bookDetail.libraryBook.id
                      )?.returnedQuantity
                    }
                    onChange={(value, book) =>
                      returnQuantityChangeHandler(
                        bookDetail.transactionUUID,
                        value,
                        book
                      )
                    }
                    max={bookDetail.quantity}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes.action}>
        <Button
          onClick={returnBookHandler}
          disabled={borrowedBooks.length === 0}
        >
          Return
        </Button>
      </div>
    </Card>
  );
};

export default LandingPage;
