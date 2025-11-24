import { Outlet } from "react-router";
import Header from "./components/Header";
import Navigator from "@/components/Navigation";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex h-screen overflow-hidden">
        <LeftSidebar />
        <main className=" w-full sm:w-[640px] bg-background mx-auto min-w-0 mt-20 sm:rounded-t-2xl sm:border-2 shadow-sm z-60 overflow-hidden ">
          <div className="fixed inset-0 bg-transparent overflow-y-auto z-61 mt-20 ">
            <Outlet />
          </div>
        </main>
        <RightSidebar />
      </div>
      <Navigator />
    </div>
  );
}
export default DefaultLayout;
