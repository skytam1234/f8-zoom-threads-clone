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
                <main className="flex-1 min-w-0 mt-20 rounded-2xl bg-transparent z-60">
                    <div className="h-screen overflow-y-auto w-full =">
                        <div className="md:max-w-160 md:mx-auto pt-16 pb-20 md:pt-0 md:pb-0 ">
                            <Outlet />
                        </div>
                    </div>
                </main>
                <RightSidebar />
            </div>
            <Navigator />
        </div>
    );
}
export default DefaultLayout;
