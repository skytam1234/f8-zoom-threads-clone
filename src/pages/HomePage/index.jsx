import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useListPost } from "@/features/posts/hooks";
import PostCard from "@/components/Posts";
import { useDispatch } from "react-redux";
import { getListPost } from "@/services/posts/postService";
function HomePage() {
    const disPatch = useDispatch();
    const listPost = useListPost();
    useEffect(() => {
        disPatch(getListPost());
    }, [disPatch]);

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
