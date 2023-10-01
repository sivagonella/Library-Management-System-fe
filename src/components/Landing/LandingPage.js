import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import classes from "./LandingPage.module.css";
import { Chip } from "@mui/material";

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
    <ul>
      {borrowedBooks.map((bookDetail) => (
        <li key={bookDetail.libraryBook.id}>
          <div className={classes.bookDescription}>
            <span className={classes.bookName}>
              {bookDetail.libraryBook.name}
            </span>
            <div>
              {bookDetail.libraryBook.authors.map((author) => {
                return (
                  <Chip
                    style={{ marginRight: "5px" }}
                    key={author.id}
                    label={author.name}
                  />
                );
              })}
            </div>
            <div>{bookDetail.date}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LandingPage;
