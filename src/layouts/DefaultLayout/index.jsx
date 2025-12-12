import { Outlet } from "react-router";
import Header from "./components/Header";
import Navigator from "@/components/Navigation";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import WrapperHeader from "./components/Header/components";
import { useFetchListFollowing } from "@/features/user/hooks";

function DefaultLayout() {
    useFetchListFollowing();
    return (
        <div className="min-h-screen">
            <div className="top-0 z-20 w-full sticky bg-layout-background">
                <div className="flex justify-center  ">
                    <div className="w-full max-w-[640px] h-[60px] md:h-[74px] z-20 flex items-center justify-center">
                        <WrapperHeader>
                            <Header />
                        </WrapperHeader>
                    </div>
                </div>
            </div>
            <div className=" flex min-w-screen h-full bg-layout-background relative justify-center">
                <LeftSidebar />
                <RightSidebar />
                <Navigator />
                <div className=" flex justify-center bg-layout-main ">
                    <div className="w-full max-w-[640px]  min-h-screen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
