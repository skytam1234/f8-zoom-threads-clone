import { useState } from "react";
import Post from "@/components/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function HomePage() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [postContent, setPostContent] = useState("");

  // Mock data - sau này sẽ lấy từ API
  const posts = [
    {
      author: {
        avatar: "https://github.com/shadcn.png",
        username: "jonathangary73",
        verified: false,
      },
      timestamp: "1 ngày",
      content: "This movie 🎬 scene had me rolling",
      media: {
        type: "video",
        url: "",
        thumbnail: "",
      },
      translate: {
        show: true,
        current: 1,
        total: 1,
      },
      engagement: {
        likes: "32,1K",
        comments: "279",
        reposts: "1K",
        shares: "1,4K",
      },
    },
    {
      author: {
        avatar: "https://github.com/shadcn.png",
        username: "minhlongmoto",
        verified: false,
      },
      timestamp: "21 giờ",
      content: "Biết chỗ bấm còi oto chưa 😂",
      media: {
        type: "video",
        url: "",
        thumbnail: "",
      },
      translate: {
        show: false,
      },
      engagement: {
        likes: "5,2K",
        comments: "89",
        reposts: "234",
        shares: "567",
      },
    },
    {
      author: {
        avatar: "https://github.com/shadcn.png",
        username: "minhlongmoto",
        verified: false,
      },
      timestamp: "21 giờ",
      content: "Biết chỗ bấm còi oto chưa 😂",
      media: {
        type: "video",
        url: "",
        thumbnail: "",
      },
      translate: {
        show: false,
      },
      engagement: {
        likes: "5,2K",
        comments: "89",
        reposts: "234",
        shares: "567",
      },
    },
    {
      author: {
        avatar: "https://github.com/shadcn.png",
        username: "minhlongmoto",
        verified: false,
      },
      timestamp: "21 giờ",
      content: "Biết chỗ bấm còi oto chưa 😂",
      media: {
        type: "video",
        url: "",
        thumbnail: "",
      },
      translate: {
        show: false,
      },
      engagement: {
        likes: "5,2K",
        comments: "89",
        reposts: "234",
        shares: "567",
      },
    },
  ];

  const tabs = [
    { id: "for-you", label: "Dành cho bạn" },
    { id: "following", label: "Đang theo dõi" },
    { id: "self-destruct", label: "Bài viết tự hủy" },
  ];

  const handlePost = () => {
    if (postContent.trim()) {
      // Xử lý đăng post ở đây
      console.log("Posting:", postContent);
      setPostContent("");
    }
  };

  return (
    <div className=" w-full sm:w-[640px] mx-auto ">
      {/* Tab Navigation */}

      {/* Create Post Section */}

      <div className="hidden md:block  px-4 py-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Your avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Có gì mới?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="flex-1  bg-transparent border-none outline-none shadow-none text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handlePost();
                }
              }}
            />
            <Button
              onClick={handlePost}
              className=" bg-transparent text-foreground border   px-6"
            >
              Đăng
            </Button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="divide-y divide-border">
        {posts.map((post, index) => (
          <Post key={index} an={false} {...post} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
