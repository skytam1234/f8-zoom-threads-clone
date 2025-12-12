import InterActionBar from "./components/InterActionBar/InterActionBar";
import QuoteCard from "./components/QuoteCard";
import PostImage from "./components/PostImage";

import PostAvatar from "./components/PostAvatar";

function PostCard({ post, isReply }) {
    return (
        <div className="w-full border-b border-border pb-4">
            {/* Grid Container */}
            <div className="grid grid-cols-[50px_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 px-4 py-3">
                {/* Avatar ở hàng 1 cột 1 */}
                <PostAvatar post={post} user={post.user} />
                {isReply && (
                    <div className="row-start-2 col-start-1 mt-8 w-0.5 h-[86%] border mx-auto "></div>
                )}

                {/* Post Content ở hàng 2 cột 2 (ngay dưới username) */}
                <div className="row-start-2 col-start-2 mt-8">
                    <p className="text-foreground mb-2">{post.content}</p>
                    {post.original_post && (
                        <QuoteCard originalPost={post.original_post} />
                    )}
                </div>

                {/* Media ở hàng 3,4 cột 2 */}

                <div className="row-start-3 row-span-2 col-start-2 w-full mb-3  ">
                    {post.media_urls[0] && <PostImage post={post} />}
                </div>

                {/* Engagement Bar dưới media (hàng 5 cột 2) */}
                {!isReply && <InterActionBar post={post} />}
            </div>
        </div>
    );
}

export default PostCard;
