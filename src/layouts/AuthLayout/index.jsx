import { Outlet } from "react-router";
import Header from "./components/Header";

function AuthLayout() {
    return (
        <>
            <div>
                <Header />
                <div>{<Outlet />}</div>
            </div>
        </>
    );
}
export default AuthLayout;
