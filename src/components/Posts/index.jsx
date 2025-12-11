import { Splide, SplideSlide } from "@splidejs/react-splide";
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
import formatDateTime from "@/utils/formatDate";

import { useCurrentUser } from "@/features/auth/hooks";
import InterActionBar from "./components/InterActionBar/InterActionBar";

function PostCard({ post }) {
    const { user } = post;
    const currentUser = useCurrentUser();

    return (
        <div className="w-full border-b border-border pb-4">
            {/* Grid Container */}
            <div className="grid grid-cols-[40px_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 px-4 py-3">
                {/* Avatar ở hàng 1 cột 1 */}
                <div className="row-start-1 col-start-1">
                    <div className="flex items-end -space-x-2">
                        <Avatar className="ring-2 ring-background">
                            <AvatarImage
                                src={user.avatar_url}
                                alt={user.username}
                            />
                            <AvatarFallback>
                                {user.username.charAt(0).toUpperCase()}
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
                            {user.username}
                        </span>
                        {user.verified && (
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
                            {formatDateTime(post.created_at)}
                        </span>
                    </div>
                    <button className="p-1 hover:bg-accent rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Post Content ở hàng 2 cột 2 (ngay dưới username) */}
                <div className="row-start-2 col-start-2 mt-8">
                    <p className="text-foreground mb-2">{post.content}</p>
                </div>

                {/* Media ở hàng 3,4 cột 2 */}

                <div className="row-start-3 row-span-2 col-start-2 w-full mb-3  ">
                    {post.media_urls && (
                        <div className="flex overflow-x-auto ">
                            <Splide
                                aria-label="Ảnh slider"
                                options={{
                                    type: "slide",
                                    arrows: false,
                                    pagination: false,
                                    perPage: 2,
                                    gap: "1rem",
                                    drag: true,
                                }}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <SplideSlide>
                                    <img
                                        src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-22.jpg.webp"
                                        alt="Image 1"
                                        className="w-full h-full object-cover rounded-2xl cursor-pointer "
                                    />
                                </SplideSlide>
                                <SplideSlide>
                                    <img
                                        src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-22.jpg.webp"
                                        alt="Image 2"
                                        className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                    />
                                </SplideSlide>
                                <SplideSlide>
                                    <img
                                        src="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-22.jpg.webp"
                                        alt="Image 2"
                                        className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                    />
                                </SplideSlide>
                            </Splide>
                        </div>
                    )}
                </div>

                {/* Engagement Bar dưới media (hàng 5 cột 2) */}
                <InterActionBar post={post} />
            </div>
        </div>
    );
}

export default PostCard;
