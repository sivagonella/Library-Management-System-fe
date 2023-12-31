import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import classes from "./Navbar.module.css";
import Button from "../UI/Button";
import { NavLink } from "react-router-dom";
// import CartContext from "../../context/cart-context";

function Navbar() {
  const authContext = useContext(AuthContext);
  // const cartContext = useContext(CartContext);
  const NavbarLinks = (
    <div>
      {authContext.userRole === "ADMIN" && (
        <NavLink
          to="/addAuthor"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={classes["navbar-item"]}>Add author</div>
        </NavLink>
      )}
      <NavLink
        to="/showBooks"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={classes["navbar-item"]}>Book list</div>
      </NavLink>
      <NavLink
        to="/checkout"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={classes["navbar-item"]}>
          <span>Checkout</span>
          {/* <span className={classes.badge}> {cartContext.totalQuantity}</span> */}
        </div>
      </NavLink>
      <Button
        className={classes.btn}
        type="button"
        onClick={authContext.onLogout}
      >
        Logout
      </Button>
    </div>
  );
  return (
    <nav
      style={{
        backgroundColor: "lightblue",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0, padding: "10px" }}>
          Library Management Systems
        </h2>
        <div>{authContext.isLoggedIn && NavbarLinks}</div>
      </div>
    </nav>
  );
}

export default Navbar;
