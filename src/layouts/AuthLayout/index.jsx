import { Outlet } from "react-router";
import Header from "./components/Header";

function AuthLayout() {
    return (
        <>
            <div className="h-screen max-w-full">
                <Header />
                <div className="mt-16">{<Outlet />}</div>
            </div>
        </>
    );
}
export default AuthLayout;
