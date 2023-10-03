import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import classes from "./LandingPage.module.css";
import { Chip } from "@mui/material";
// import styled from "styled-components";
import { Card } from "react-bootstrap";

const LandingPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
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
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((bookDetail) => {
            return (
              <tr key={bookDetail.libraryBook.id}>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default LandingPage;
