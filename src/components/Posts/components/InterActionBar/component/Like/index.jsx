import { cn } from "@/lib/utils";
import { actionLike } from "@/services/posts/interactionServicers";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeAction({ post }) {
    const [isLike, setIsLike] = useState(post.is_liked_by_auth);
    const [counter, setCounter] = useState(post.likes_count);

    const onHandle = async () => {
        try {
            const res = await actionLike(post.id);
            setIsLike(res.is_liked);
            setCounter(res.likes_count);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors group py-1"
                onClick={() => {
                    onHandle();
                }}
            >
                <Heart
                    className={cn(
                        "w-5 h-5  group-hover:text-red-500 transition-colors",
                        isLike ? "text-red-500" : ""
                    )}
                />
                <span className="text-sm">{counter}</span>
            </button>
        </>
    );
}
