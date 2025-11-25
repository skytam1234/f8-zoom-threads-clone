import { useMemo, useState } from "react";
import Post from "@/components/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Share2, Instagram, BarChart3 } from "lucide-react";

const tabs = [
    { id: "threads", label: "Thread" },
    { id: "replies", label: "Thread trả lời" },
    { id: "media", label: "File phương tiện" },
    { id: "reposts", label: "Bài đăng lại" },
];

function ProfilePage() {
    const [activeTab, setActiveTab] = useState("threads");

    const user = useMemo(
        () => ({
            name: "Tâm Dương",
            username: "tam.duongduc",
            about: "Designing like a ghost, shipping like a ninja 🥷",
            website: "https://dribbble.com/tamduong",
            followers: 0,
        }),
        []
    );

    const posts = useMemo(
        () => [
            {
                author: {
                    avatar: "https://i.pravatar.cc/200?img=8",
                    username: user.username,
                    verified: false,
                },
                timestamp: "2 giờ",
                content:
                    "Prototype cho app banking mới – nhận xét giúp mình xem flow đã mượt chưa?",
                translate: { show: true, current: 1, total: 1 },
                engagement: {
                    likes: "1,2K",
                    comments: "108",
                    reposts: "59",
                    shares: "321",
                },
            },
            {
                author: {
                    avatar: "https://i.pravatar.cc/200?img=8",
                    username: user.username,
                    verified: false,
                },
                timestamp: "1 ngày",
                content: "Moodboard tuần này: noise texture x monochrome.",
                translate: { show: false },
                engagement: {
                    likes: "782",
                    comments: "55",
                    reposts: "12",
                    shares: "201",
                },
            },
        ],
        [user.username]
    );

    const showEmpty = activeTab !== "threads" && activeTab !== "reposts";

    return (
        <div className="w-full max-w-[640px] mx-auto px-4 py-6 space-y-6">
            {/* header */}
            <div className=" bg-layout-main text-card-foreground p-6  ">
                <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-2xl font-semibold leading-tight">
                                {user.name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                @{user.username}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {user.about}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.followers} người theo dõi</span>
                            <a
                                href={user.website}
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {user.website.replace("https://", "")}
                            </a>
                        </div>
                    </div>

                    <Avatar className="size-20 border-2 border-border shadow">
                        <AvatarImage
                            src="https://i.pravatar.cc/200?img=8"
                            alt={user.name}
                        />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex gap-2">
                    <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90">
                        Chỉnh sửa trang cá nhân
                    </Button>
                    <Button variant="outline" size="icon">
                        <BarChart3 className="size-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Instagram className="size-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Share2 className="size-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-5" />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b flex">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={cn(
                            "flex-1 py-3 text-sm font-medium transition-colors relative",
                            activeTab === tab.id
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-foreground" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            {showEmpty && (
                <div className="text-center py-20 text-muted-foreground text-sm">
                    Chưa có nội dung nào.
                </div>
            )}

            {!showEmpty && activeTab === "threads" && (
                <div className=" bg-card rounded-3xl  shadow-sm">
                    {posts.map((post, idx) => (
                        <Post key={idx} {...post} />
                    ))}
                </div>
            )}

            {!showEmpty && activeTab === "reposts" && (
                <div className="bg-card rounded-3xl border p-10 text-center text-muted-foreground">
                    Chưa có bài đăng lại nào.
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
