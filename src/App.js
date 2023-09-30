import "./App.css";
import BookTable from "./components/Book/BookTable";
import Navbar from "./components/Navbar/Navbar";
import AddBook from "./components/Book/AddBook";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
// import { useContext } from "react";
// import AuthContext from "./context/auth-context";
import AddAuthor from "./components/Author/AddAuthor";
import ProtectedUserRoutes from "./components/ProtectedRoutes/ProtectedUserRoutes";
import ProtectedAdminRoutes from "./components/ProtectedRoutes/ProtectedAdminRoutes";

function App() {
  // const authContext = useContext(AuthContext);
  // if (!authContext.isLoggedIn) {
  //   return (
  //     <>
  //       <Navbar />
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/signup" element={<Signup />} />
  //         <Route path="*" element={<Navigate to="/" />} />
  //       </Routes>
  //     </>
  //   );
  // }

  // return (
  //   <div className="App">
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<BookTable />} />
  //       <Route path="/addBook" element={<AddBook />} />
  //       <Route path="/addAuthor" element={<AddAuthor />} />
  //       <Route path="/showBooks" element={<BookTable />} />
  //       <Route path="/checkout" element={<CheckoutPage />} />
  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //   </div>
  // );

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedUserRoutes />}>
          <Route path="/" element={<BookTable />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route element={<ProtectedAdminRoutes />}>
          <Route path="/" element={<BookTable />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/addAuthor" element={<AddAuthor />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
