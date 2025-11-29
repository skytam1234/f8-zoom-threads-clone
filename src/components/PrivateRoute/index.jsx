import { useCurrentUser } from "@/features/auth/hooks";
import { getCurrentUser } from "@/services/auth/authService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

function PrivateRoute() {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

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
