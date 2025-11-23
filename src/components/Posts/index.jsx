import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  Play,
  Plug,
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
    <div className="w-full border-b border-border pb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}

          <div className="flex flex-row flex-wrap items-center gap-12">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2  items-end">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="flex items-center justify-center h-4 w-4 object-cover bg-black">
                <Plus className="text-white" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Username and timestamp */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {author.username}
            </span>
            {author.verified && (
              <svg
                className="w-4 h-4 text-blue-500"
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
            <span className="text-sm text-muted-foreground">{timestamp}</span>
          </div>
        </div>

        {/* More menu */}
        <button className="p-1 hover:bg-accent rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 mb-3">
        <p className="text-foreground mb-2">{content}</p>

        {/* Translate button */}
        {translate.show && (
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dịch {translate.current}/{translate.total}
          </button>
        )}
      </div>

      {/* Media */}
      {media && (
        <div className="relative w-full mb-3 bg-muted">
          {/* Placeholder for video/image */}
          <div className="w-full aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
            {/* Thumbnail placeholder - replace with actual image/video */}
            <div className="absolute inset-0 bg-linear-to-br from-muted to-muted/50" />

            {/* Play button overlay for video */}
            {media.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Engagement Bar */}
      <div className="px-4 flex items-center gap-6">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
          <span className="text-sm">{engagement.likes}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">{engagement.comments}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Repeat2 className="w-5 h-5" />
          <span className="text-sm">{engagement.reposts}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Send className="w-5 h-5" />
          <span className="text-sm">{engagement.shares}</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
