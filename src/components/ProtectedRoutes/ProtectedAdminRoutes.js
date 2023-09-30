import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoutes = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");
  const isAdmin = Cookies.get("userRole") === "ADMIN";

  return (
    <>
      {isLoggedIn ? (
        isAdmin ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedAdminRoutes;