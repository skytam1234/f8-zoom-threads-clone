import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/features/auth/hooks";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetUsers, searchSlice } from "@/features/search/searchSlice";
import { getUserSuggestions, search } from "@/services/search/searchServices";
import InfiniteScroll from "react-infinite-scroll-component";

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [following] = useState(new Set());
    const currentUser = useCurrentUser();
    const loading = useSelector(
        (state) => state[searchSlice.reducerPath].loading
    );
    const lastPage = useSelector(
        (state) => state[searchSlice.reducerPath].pagination.last_page
    );
    const users = useSelector((state) => state[searchSlice.reducerPath].users);

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(resetUsers(null));
            if (searchQuery === "") {
                dispatch(getUserSuggestions({ page }));
            } else {
                dispatch(search({ searchQuery, page }));
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery, page, dispatch]);
    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(resetUsers());
            if (searchQuery === "") {
                dispatch(getUserSuggestions({ page }));
            } else {
                dispatch(getUserSuggestions({ searchQuery, page }));
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery, page, dispatch]);

    const hasMore = lastPage === 0 || page < lastPage;

    const fetchMoreData = () => {
        if (loading) return;
        if (lastPage > 0 && page < lastPage) setPage((pre) => pre + 1);
    };
    if (!currentUser) return null;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            {!currentUser && <Navigate to="/login" />}
            <div className="hidden md:block fixed inset-x-0 h-20 top-6 z-64">
                <div className="w-full sm:w-[640px] md:mx-auto flex items-center   ">
                    <h1 className="ml-[50%] translate-x-[-50%] text-xl font-semibold text-foreground">
                        Tìm kiếm
                    </h1>
                    <button className="  p-1 ml-auto mr-4 bg-layout-main rounded-full border shadow hover:scale-105">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>
            <div className="ml-4 p-6 bg-transparent">
                {/* Search Bar */}
                <div className=" p-4 relative flex items-center justify-center">
                    <Search className="absolute left-8 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[590px] px-10 py-2 h-11 rounded-lg bg-layout-background border focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button className="absolute right-6 p-1.5 bg-transparent ">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
                {/* Suggested Users Section */}
                <div className="px-4 py-4">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Gợi ý theo dõi
                    </h2>
                    <InfiniteScroll
                        dataLength={users?.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <div className="text-center py-4 text-gray-500">
                                Đang tải...
                            </div>
                        }
                        endMessage={
                            <div className="text-center py-4 text-gray-500">
                                <p>Đã hết bài viết</p>
                            </div>
                        }
                        scrollThreshold={0.9} // Trigger khi còn 80% để đến cuối
                    >
                        <div className="space-y-4 ">
                            {users?.map((user) => {
                                const isFollowing = following.has(user.id);
                                return (
                                    <div
                                        key={user.id}
                                        className="flex items-start gap-3 py-2 hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors"
                                    >
                                        {/* Avatar */}
                                        <Avatar className="w-12 h-12 shrink-0">
                                            <AvatarImage
                                                src={user.avatar_url}
                                                alt={user.username}
                                            />
                                            <AvatarFallback>
                                                {user.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="font-semibold text-foreground text-sm">
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
                                            </div>

                                            {/* Name */}
                                            {user.name && (
                                                <p className="text-sm text-foreground font-medium mb-0.5">
                                                    {user.name}
                                                </p>
                                            )}

                                            {/* Bio */}
                                            {user.bio && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                                                    {user.bio}
                                                </p>
                                            )}

                                            {/* Follower Count */}
                                            <p className="text-xs text-muted-foreground">
                                                {user.followers_count} người
                                                theo dõi
                                            </p>
                                        </div>

                                        {/* Follow Button */}
                                        <Button
                                            className={cn(
                                                "shrink-0 px-4 h-8 text-sm font-medium"
                                            )}
                                        >
                                            {isFollowing
                                                ? "Đang theo dõi"
                                                : "Theo dõi"}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
