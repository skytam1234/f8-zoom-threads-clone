import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { likeOrDiskLikePost } from "@/services/posts/interactionServicers";
import { useEffect } from "react";
function InterActionBar({ post }) {
  return (
    <div className="row-start-5 col-start-2 grid grid-cols-4 gap-2 sm:w-[50%]">
      <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors group py-1">
        <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
        <span className="text-sm">{post.likes_count}</span>
      </button>
      <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">{post.replies_count}</span>
      </button>
      <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
        <Repeat2 className="w-5 h-5" />
        <span className="text-sm">{post.reposts_and_quotes_count}</span>
      </button>
      <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
        <Send className="w-5 h-5" />
        <span className="text-sm">{post.reposts_and_quotes_count}</span>
      </button>
    </div>
  );
}
export default InterActionBar;
