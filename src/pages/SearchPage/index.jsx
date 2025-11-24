import { useState } from "react";
import { Search, MoreHorizontal, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [following, setFollowing] = useState(new Set());

    // Mock data - sau này sẽ lấy từ API
    const suggestedUsers = [
        {
            id: 1,
            avatar: "https://github.com/shadcn.png",
            username: "camxuccuachungta",
            verified: false,
            name: "Cam xuc cua chung ta",
            bio: "Cảm xúc của chúng ta không giống nhau",
            followers: "42,9K",
        },
        {
            id: 2,
            avatar: "https://github.com/shadcn.png",
            username: "igor_brehov",
            verified: false,
            name: "Игорь Брехов",
            bio: "Типо я должен тут говорить про фотографию",
            followers: "27K",
        },
        {
            id: 3,
            avatar: "https://github.com/shadcn.png",
            username: "hocsinhtinhtuong",
            verified: false,
            name: "Học Sinh Tinh Tướng",
            bio: "",
            followers: "21,2K",
        },
        {
            id: 4,
            avatar: "https://github.com/shadcn.png",
            username: "hansara.official",
            verified: true,
            name: "한사라",
            bio: "Just me, Sara",
            followers: "160K",
        },
        {
            id: 5,
            avatar: "https://github.com/shadcn.png",
            username: "causongcototkhong",
            verified: false,
            name: "Cậu sống có tốt không???",
            bio: '"Đóng cửa đọc kinh Phật, mở cửa đón khách quý, ra cửa tìm non nước, ấy là ba chuyện vui lớn của đời người. "OBJ',
            followers: "25.5K",
        },
    ];

    const handleFollow = (userId) => {
        setFollowing((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background border-b border-border">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-semibold text-foreground">
                        Tìm kiếm
                    </h1>
                    <button className="p-2 hover:bg-accent rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-4 border-b border-border">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-10 h-11 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button className="absolute right-3 p-1.5 hover:bg-accent rounded-full transition-colors">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Suggested Users Section */}
            <div className="px-4 py-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    Gợi ý theo dõi
                </h2>

                <div className="space-y-4">
                    {suggestedUsers.map((user) => {
                        const isFollowing = following.has(user.id);
                        return (
                            <div
                                key={user.id}
                                className="flex items-start gap-3 py-2 hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors"
                            >
                                {/* Avatar */}
                                <Avatar className="w-12 h-12 shrink-0">
                                    <AvatarImage
                                        src={user.avatar}
                                        alt={user.username}
                                    />
                                    <AvatarFallback>
                                        {user.username.charAt(0).toUpperCase()}
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
                                        {user.followers} người theo dõi
                                    </p>
                                </div>

                                {/* Follow Button */}
                                <Button
                                    onClick={() => handleFollow(user.id)}
                                    variant={
                                        isFollowing ? "outline" : "default"
                                    }
                                    className={cn(
                                        "shrink-0 px-4 h-8 text-sm font-medium",
                                        isFollowing
                                            ? "border-border"
                                            : "bg-black text-white hover:bg-black/90"
                                    )}
                                >
                                    {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
