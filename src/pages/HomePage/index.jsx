import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchListPost, useListPost } from "@/features/posts/hooks";
import PostCard from "@/components/Posts";
import { useSelector } from "react-redux";

import { postSlice } from "@/features/posts/postSlice";
function HomePage() {
  const [page, setPage] = useState(1);
  useFetchListPost({ limit: 20, page });
  const listPost = useListPost();
  const loading = useSelector((state) => state[postSlice.reducerPath].loading);
  const lastPage = useSelector(
    (state) => state[postSlice.reducerPath].pagination.last_page
  );
  const handleLoadMore = useCallback(() => {
    if (loading || page > lastPage) return;
    setPage(page + 1);
  }, [page, lastPage, loading]);

  useEffect(() => {
    console.log(listPost);
    const handle = () => {
      const bottomOffset =
        document.documentElement.scrollHeight -
        (window.innerHeight + window.scrollY);
      if (bottomOffset <= 200) handleLoadMore();
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, [handleLoadMore]);

  // Mock data - sau này sẽ lấy từ API

  return (
    <div className=" w-full sm:w-[640px] mx-auto bg-layout-main px-4">
      <div className="fixed inset-x-0 -top-20 z-100 h-16 sm:flex items-center justify-center hidden  ">
        <div className="">Trang chủ</div>
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

      {/* Posts List */}
      <div className="w-full divide-y divide-border">
        {listPost.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
