import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

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
  // const [loggedIn, setLoggedIn, removeLoggedIn] = useCookies(["Auth"]);

  useEffect(() => {
    setIsUserLoggedIn(Cookies.get("isLoggedIn") === "1");
    setUserRole(Cookies.get("userRole"));
  }, []);

  const loginHandler = (email, password) => {
    fetch("http://localhost:8080/demo/users/email=" + email, {
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
        // setLoggedIn("Auth", 1, { path: "/" });
        Cookies.set("isLoggedIn", "1");
        Cookies.set("userRole", result.role);
        setUserRole(result.role);
        setIsUserLoggedIn(true);
      }
    });
  };
  const logoutHandler = () => {
    setIsUserLoggedIn(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("userRole");
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
