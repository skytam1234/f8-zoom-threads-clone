import PostCard from "@/components/Posts";
import PostAvatar from "@/components/Posts/components/PostAvatar";
import { useCurrentUser } from "@/features/auth/hooks";

export default function ReplyModal({ post }) {
    const currentUser = useCurrentUser();
    return (
        <>
            <div>
                <PostCard post={post} isReply={true} />
            </div>
            <div className="grid grid-cols-[50px_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 px-4 py-3"></div>
        </>
    );
}
