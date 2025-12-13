import ProfileModal from "@/components/common/ProfileModal";
import LoginModal from "@/components/LogInModal";
import Modal from "@/components/Modal";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/features/auth/hooks";
import { useIsFollowings } from "@/features/user/hooks";
import { cn } from "@/lib/utils";
import formatDateTime from "@/utils/formatDate";
import { Avatar } from "@radix-ui/react-avatar";
import { Check, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";

export default function PostAvatar({ post }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLog, setIsOpenLog] = useState(false);
    const { user } = post;
    const currentUser = useCurrentUser();
    const isFollow = useIsFollowings(user?.id);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <ProfileModal user={user} />
            </Modal>
            <Modal
                isOpen={isOpenLog}
                onClose={() => {
                    setIsOpenLog(false);
                }}
            >
                <LoginModal />
            </Modal>
            <div className="row-start-1 col-start-1 flex items-center justify-center">
                <div className="flex flex-row flex-wrap items-center  relative">
                    <div className="w-10 h-10 bg-amber-600 rounded-full overflow-hidden">
                        <Avatar>
                            <AvatarImage
                                src={user?.avatar_url}
                                alt={user?.name}
                            />
                            <AvatarFallback>{user?.username[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div
                        className={cn(
                            "w-5 h-5  rounded-full absolute bottom-0 right-0 bg-black flex items-center justify-center hover:scale-[115%]",
                            user?.id === currentUser?.id ? "hidden" : ""
                        )}
                        onClick={() => {
                            if (currentUser) {
                                setIsOpen(true);
                            } else {
                                setIsOpenLog(true);
                            }
                        }}
                    >
                        {isFollow ? (
                            <Check className="h-4 w-4 text-white" />
                        ) : (
                            <Plus className="h-4 w-4 text-white" />
                        )}
                    </div>
                </div>
            </div>
            {/* Username + timestamp + more button ở hàng 2 cột 2 */}
            <div className="row-start-1 col-start-2 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-foreground truncate">
                        {user?.username}
                    </span>
                    {user?.verified && (
                        <svg
                            className="w-4 h-4 text-blue-500 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    <span className="text-sm text-muted-foreground shrink-0">
                        {formatDateTime(post?.created_at)}
                    </span>
                </div>
                <button className="p-1 hover:bg-accent rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>
        </>
    );
}
