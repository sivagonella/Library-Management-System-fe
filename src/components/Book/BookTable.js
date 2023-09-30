import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import BookInput from "./BookInput";
import classes from "./BookInput.module.css";
import CartContext from "../../context/cart-context";
import { useNavigate } from "react-router-dom";

export default function BookTable() {
  const [bookList, setBookList] = useState([]);
  const cartContext = React.useContext(CartContext);
  const navigator = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8080/lms/books")
        .then(async (res) => {
          const data = await res.json();
          // console.log(data);
          setBookList(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);

  const bookNumberChangeHandler = (value, book) => {
    if (+value <= book.quantity) {
      cartContext.addBook({
        ...book,
        selectedQuantity: +value,
      });
    }
  };

  return (
    <>
      <h2 style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
        List of available books
      </h2>
      <div style={{ padding: "10px", width: "90%", margin: "auto" }}>
        <TableContainer
          className={classes["table-container"]}
          component={Paper}
        >
          <Table
            sx={{ minWidth: 700 }}
            style={{ height: "100px", overflowY: "scroll" }}
            aria-label="customized table"
          >
            <TableHead style={{ position: "sticky", top: 0 }}>
              <TableRow>
                <StyledTableCell>Book name</StyledTableCell>
                <StyledTableCell align="right">Author Names</StyledTableCell>
                <StyledTableCell align="right">
                  Number of books available&nbsp;
                </StyledTableCell>
                <StyledTableCell align="right">
                  Number of books to checkout&nbsp;
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookList.map((book) => (
                <StyledTableRow key={book.id}>
                  <StyledTableCell component="th" scope="row">
                    {book.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {book.authors.map((author) => (
                      <Chip
                        key={author.id}
                        style={{ marginRight: "5px" }}
                        label={author.name}
                      />
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {book.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <BookInput
                      id={book.id}
                      book={book}
                      value={cartContext.findBookQuantity(book.id)}
                      onChange={bookNumberChangeHandler}
                      // onBlur={bookNumberChangeHandler}
                      numOfBooks={book.quantity}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        className="addBooksToCheckout"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          id="addBooksToCheckout"
          style={{ padding: "10px" }}
          onClick={() => {
            navigator("/checkout");
          }}
        >
          Add Books
        </Button>
      </div>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
