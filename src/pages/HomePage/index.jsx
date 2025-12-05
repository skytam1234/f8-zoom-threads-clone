import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useFetchListPost, useListPost } from "@/features/posts/hooks";
import PostCard from "@/components/Posts";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { postSlice } from "@/features/posts/postSlice";
function HomePage() {
    const [page, setPage] = useState(1);
    const isLoadingMoreRef = useRef(false);
    useFetchListPost({ limit: 20, page });
    const listPost = useListPost();
    const loading = useSelector(
        (state) => state[postSlice.reducerPath].loading
    );
    const lastPage = useSelector(
        (state) => state[postSlice.reducerPath].pagination.last_page
    );
    const hasMore = lastPage === 0 || page < lastPage;
    const fetchMoreData = useCallback(() => {
        if (loading || isLoadingMoreRef.current || !hasMore) {
            console.log("Blocked fetchMoreData:", {
                loading,
                isLoadingMore: isLoadingMoreRef.current,
                hasMore,
            });
            return;
        }
        isLoadingMoreRef.current = true;
        setPage((prevPage) => prevPage + 1);
    }, [loading, hasMore]);

    useEffect(() => {
        if (!loading && isLoadingMoreRef.current) {
            isLoadingMoreRef.current = false;
        }
    }, [loading]);

    // Mock data - sau này sẽ lấy từ API

    return (
        <div className=" w-full sm:w-[640px] mx-auto bg-layout-main px-4">
            <div className="fixed left-1/2 -translate-x-1/2 top-8 w-full max-w-[640px] z-20 flex items-center justify-center bg-layout-background py-2 pointer-events-none">
                <div className="font-semibold pointer-events-auto">
                    Trang chủ
                </div>
            </div>
            {/* Create Post Section */}

            <div className="hidden md:block   ">
                <div className="flex items-start gap-3 py-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="Your avatar"
                        />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1  bg-transparent border-none outline-none shadow-none text-base text-gray-400">
                            Có gì mới?
                        </div>

                        <Button className=" bg-transparent text-foreground border   px-6">
                            Đăng
                        </Button>
                    </div>
                </div>
            </div>

            {/* Posts List với InfiniteScroll */}
            <InfiniteScroll
                dataLength={listPost.length}
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
                scrollableTarget="scrollableDiv" // ID của scroll container
                scrollThreshold={0.8} // Trigger khi còn 80% để đến cuối
            >
                <div className="w-full divide-y divide-border">
                    {listPost.map((item) => (
                        <PostCard post={item} key={item.id} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default HomePage;
