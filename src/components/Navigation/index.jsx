import { Heart, House, Plus, Search, User } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { cn } from "@/lib/utils";

function Navigator() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { icon: House, path: "/", label: "Home" },
    { icon: Search, path: "/search", label: "Search" },
    { icon: Plus, path: "/create", label: "Create" },
    { icon: Heart, path: "/activity", label: "Activity" },
    { icon: User, path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background mb-1">
      <div className="max-w-full mx-auto px-2">
        <div className="flex items-center justify-around h-9 gap-1">
          {navItems.map(({ icon: Icon, path }, index) => {
            const isActive =
              path === "/" ? isHome : location.pathname.startsWith(path);

            if (index === 2) {
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full transition-colors text-muted-foreground rounded-md bg-accent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 mb-1",
                      isActive && path === "/" && "fill-current"
                    )}
                  />
                </NavLink>
              );
            } else {
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full transition-colors text-muted-foreground rounded-md hover:bg-accent",
                    isActive
                      ? "text-foreground hover:bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 mb-1",
                      isActive && path === "/" && "fill-current"
                    )}
                  />
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
export default Navigator;
