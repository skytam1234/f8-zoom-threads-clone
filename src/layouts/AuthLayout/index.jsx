import { Outlet } from "react-router";
import Header from "./components/Header";

function AuthLayout() {
  return (
    <>
      <div className="h-screen max-w-full">
        <Header />
        <div>{<Outlet />}</div>
      </div>
    </>
  );
}
export default AuthLayout;
