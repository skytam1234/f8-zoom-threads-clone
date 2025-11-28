import { useCurrentUser } from "@/features/auth/hooks";
import { Navigate, Outlet, useLocation } from "react-router";

function PrivateRoute() {
  const currentUser = useCurrentUser();
  const location = useLocation();
  if (!currentUser)
    return (
      <Navigate
        to={`/login?continue=${encodeURIComponent(location.pathname)}`}
      />
    );
  return <Outlet />;
}
export default PrivateRoute;
