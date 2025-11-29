import { Outlet } from "react-router";
import Header from "./components/Header";
import Navigator from "@/components/Navigation";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { useRef } from "react";

function DefaultLayout() {
    const scrollRef = useRef(null);

    const handleWheel = (e) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop += e.deltaY;
    };

    return (
        <div
            className="h-screen bg-layout-background  overflow-hidden"
            onWheel={handleWheel}
        >
            <Header />
            <div className="relative min-w-screen h-full">
                <LeftSidebar />
                <RightSidebar />
                <Navigator />
                <div className="fixed left-1/2 -translate-x-1/2 top-20 w-full max-w-[640px]  h-[calc(100vh-80px)] sm:border-2  rounded-t-2xl overflow-hidden sm:shadow-sm">
                    <div
                        ref={scrollRef}
                        className="h-full w-full scrollbar-hidden overflow-y-auto"
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
