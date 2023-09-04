import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  userRole: "",
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export default AuthContext;

export const AuthProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(["Auth"]);

  useEffect(() => {
    setIsUserLoggedIn(loggedIn.Auth === "1");
  }, [loggedIn]);

  const loginHandler = (email, password) => {
    fetch("http://localhost:8080/demo/getUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(async (res) => {
      let result = await res.json();
      if (result.isCorrectPassword === 1) {
        setLoggedIn("Auth", 1, { path: "/" });
        setUserRole(result.role);
        setIsUserLoggedIn(true);
      }
    });
  };
  const logoutHandler = () => {
    setIsUserLoggedIn(false);
    removeLoggedIn("Auth");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isUserLoggedIn,
        userRole: userRole,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
