import { authSlice } from "@/features/auth/authSlice";
import { useCurrentUser } from "@/features/auth/hooks";
import { getCurrentUser } from "@/services/auth/authService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

function PrivateRoute() {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const fetching = useSelector(
    (state) => state[authSlice.reducerPath].fetching
  );
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const location = useLocation();
  if (fetching) {
    return <div>Loading...</div>;
  }
  if (!currentUser)
    return (
      <Navigate
        to={`/login?continue=${encodeURIComponent(location.pathname)}`}
      />
    );
  return <Outlet />;
}
export default PrivateRoute;
