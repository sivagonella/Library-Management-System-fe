import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import classes from "./LandingPage.module.css";
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
    <div>
      <table>
        <tr>
          <th>Book Name</th>
          <th>Author Names</th>
          <th>Borrowed Quantity</th>
          <th>Borrowed Date</th>
          <th>Return Date</th>
        </tr>
        {borrowedBooks.map((bookDetail) => {
          return (
            <tr key={bookDetail.libraryBook.id}>
              <td>{bookDetail.libraryBook.name}</td>
              {bookDetail.libraryBook.authors.map((author) => (
                <Chip
                  key={author.id}
                  style={{ marginRight: "5px" }}
                  label={author.name}
                />
              ))}
              <td>{bookDetail.quantity}</td>
              <td>{bookDetail.borrowedDate}</td>
              <td>{bookDetail.returnDate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default LandingPage;
