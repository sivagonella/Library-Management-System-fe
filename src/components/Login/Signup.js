import Input from "../UI/Input";
import Card from "../UI/Card";
import classes from "./Signup.module.css";
import { useState } from "react";
import Button from "../UI/Button";

const Signup = () => {
  const [userSignupState, setUserSignupState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (id, value) => {
    setUserSignupState((state) => {
      return { ...state, [id]: value };
    });
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/lms/addNewUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: userSignupState.firstName,
        lastName: userSignupState.lastName,
        userEmail: userSignupState.email,
        userPassword: userSignupState.password,
      }),
    }).then(async (res) => {
      // console.log(await res.json());
    });
    setUserSignupState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={signupSubmitHandler}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Sign Up</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label style={{ flex: "1" }}>Name</label>
          <input
            type="text"
            id="firstName"
            className={classes.nameInput}
            style={{ marginRight: "2px" }}
            placeholder="First Name"
            value={userSignupState.firstName}
            onChange={(event) => {
              inputChangeHandler("firstName", event.target.value);
            }}
          />
          <input
            type="text"
            id="lastName"
            className={classes.nameInput}
            placeholder="Last Name"
            value={userSignupState.lastName}
            onChange={(event) => {
              inputChangeHandler("lastName", event.target.value);
            }}
          />
        </div>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="test@test.com"
          value={userSignupState.email}
          onChange={inputChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="*******"
          value={userSignupState.password}
          onChange={inputChangeHandler}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*******"
          value={userSignupState.confirmPassword}
          onChange={inputChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Sign up
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Signup;
