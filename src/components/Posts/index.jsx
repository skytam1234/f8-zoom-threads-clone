import {
    Heart,
    MessageCircle,
    Repeat2,
    Send,
    MoreHorizontal,
    Play,
    Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Post({
    author = {
        avatar: "R",
        username: "resiliencehq",
        verified: false,
    },
    timestamp = "20 giờ",
    content = "The Life-Saving Bed That Transforms Into a Disaster Survival Pod",
    media = {
        type: "video", // "video" | "image"
        url: "",
        thumbnail: "",
    },
    translate = {
        show: true,
        current: 1,
        total: 3,
    },
    engagement = {
        likes: "21,9K",
        comments: "472",
        reposts: "638",
        shares: "2,9K",
    },
}) {
    return (
        <div className="w-full border-t border-border pb-4">
            {/* Grid Container */}
            <div className="grid grid-cols-[40px_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 px-4 py-3">
                {/* Avatar ở hàng 1 cột 1 */}
                <div className="row-start-1 col-start-1">
                    <div className="flex items-end -space-x-2">
                        <Avatar className="ring-2 ring-background">
                            <AvatarImage
                                src={
                                    author.avatar ||
                                    "https://github.com/shadcn.png"
                                }
                                alt={author.username}
                            />
                            <AvatarFallback>
                                {author.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Avatar className="h-4 w-4 bg-black ring-2 ring-background flex items-center justify-center">
                            <Plus className="w-3 h-3 text-white" />
                            <AvatarFallback />
                        </Avatar>
                    </div>
                </div>

                {/* Username + timestamp + more button ở hàng 2 cột 2 */}
                <div className="row-start-1 col-start-2 flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="font-semibold text-foreground truncate">
                            {author.username}
                        </span>
                        {author.verified && (
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
                            {timestamp}
                        </span>
                    </div>
                    <button className="p-1 hover:bg-accent rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Post Content ở hàng 2 cột 2 (ngay dưới username) */}
                <div className="row-start-2 col-start-2 mt-8">
                    <p className="text-foreground mb-2">{content}</p>
                    {translate.show && (
                        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Dịch {translate.current}/{translate.total}
                        </button>
                    )}
                </div>

                {/* Media ở hàng 3,4 cột 2 */}
                {media && (
                    <div className="row-start-3 row-span-2 col-start-2 relative w-full mb-3 bg-muted">
                        <div className="w-full aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
                            {media.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                        <Play
                                            className="w-8 h-8 text-white ml-1"
                                            fill="white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Engagement Bar dưới media (hàng 5 cột 2) */}
                <div className="row-start-5 col-start-2 grid grid-cols-4 gap-2 sm:w-[50%]">
                    <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors group py-1">
                        <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                        <span className="text-sm">{engagement.likes}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{engagement.comments}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                        <Repeat2 className="w-5 h-5" />
                        <span className="text-sm">{engagement.reposts}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
                        <Send className="w-5 h-5" />
                        <span className="text-sm">{engagement.shares}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
