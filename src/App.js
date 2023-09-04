import "./App.css";
import BookTable from "./components/BookTable/BookTable";
import Navbar from "./components/Navbar/Navbar";
import AddAuthor from "./components/Author/AddAuthor";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import { useContext } from "react";
import AuthContext from "./context/auth-context";

function App() {
  const authContext = useContext(AuthContext);
  if (!authContext.isLoggedIn) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BookTable />} />
        <Route path="/addAuthor" element={<AddAuthor />} />
        <Route path="/showBooks" element={<BookTable />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
