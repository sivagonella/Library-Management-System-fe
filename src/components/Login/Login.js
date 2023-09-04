import Input from "../UI/Input";
import Card from "../UI/Card";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";

const Login = () => {
  const [userLoginState, setUserLoginState] = useState({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);

  let navigate = useNavigate();
  const signupPageHandler = () => {
    navigate("/signup");
  };

  const inputChangeHandler = (id, value) => {
    setUserLoginState((state) => {
      return { ...state, [id]: value };
    });
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(userLoginState.email, userLoginState.password);
  };

  return (
    <Card className={classes.form}>
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Login</h3>
      <form onSubmit={loginSubmitHandler}>
        <Input
          id="email"
          label="Email"
          type="email"
          value={userLoginState.email}
          onChange={inputChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={userLoginState.password}
          onChange={inputChangeHandler}
        />
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.btn}
            onClick={signupPageHandler}
          >
            Signup
          </button>
          <button type="submit" className={classes.btn}>
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
