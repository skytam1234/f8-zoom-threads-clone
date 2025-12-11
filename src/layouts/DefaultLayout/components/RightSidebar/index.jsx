import LoginModal from "@/components/LogInModal";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";

import { Plus } from "lucide-react";

function RightSidebar() {
    const currentUser = useCurrentUser();
    return (
        <div className="hidden lg:flex lg:flex-col lg:justify-between items-end w-80 p-6 mt-8 fixed right-0 top-0 h-screen overflow-y-auto z-63">
            {!currentUser && <LoginModal />}
        </div>
    );
}
export default RightSidebar;
