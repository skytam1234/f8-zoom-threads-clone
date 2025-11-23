import { Outlet } from "react-router";
import Header from "./components/Header";
import Navigator from "@/components/Navigation";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile: Header ở top */}
      <Header />
      
      {/* Desktop: Layout 3 cột */}
      <div className="flex">
        {/* Left Sidebar - chỉ hiển thị trên desktop */}
        <LeftSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Mobile: padding cho header và bottom nav */}
          <div className="pt-16 pb-20 md:pt-0 md:pb-0">
            <Outlet />
          </div>
        </main>
        
        {/* Right Sidebar - chỉ hiển thị trên desktop */}
        <RightSidebar />
      </div>
      
      {/* Mobile: Bottom navigation */}
      <Navigator />
    </div>
  );
}
export default DefaultLayout;