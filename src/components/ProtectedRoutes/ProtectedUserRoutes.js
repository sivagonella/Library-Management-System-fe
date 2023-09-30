import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoutes = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedUserRoutes;
