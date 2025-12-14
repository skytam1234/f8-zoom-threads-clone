import PostAvatar from "../PostAvatar";

function QuoteCard({ originalPost }) {
  if (!originalPost) return null;

  return (
    <div className="w-full border rounded-3xl pb-4">
      {/* Grid Container */}
      <div className="grid grid-cols-[50px_1fr] grid-rows-[auto_auto_auto_auto_auto] gap-2 px-4 py-3">
        <PostAvatar post={originalPost} />

        {/* Post Content ở hàng 2 cột 2 (ngay dưới username) */}
        <div className="row-start-2 col-start-2 mt-8">
          <p className="text-foreground mb-2">{originalPost.content}</p>
          {originalPost?.original_post && (
            <QuoteCard originalPost={originalPost?.original_post} />
          )}
        </div>

        {/* Media ở hàng 3,4 cột 2 */}

        <div className="row-start-3 row-span-2 col-start-2 w-full mb-3  ">
          {originalPost?.media_urls && (
            <div className="flex overflow-x-auto ">Anhr</div>
          )}
        </div>

        {/* Engagement Bar dưới media (hàng 5 cột 2) */}
        {/* <InterActionBar post={originalPost} /> */}
      </div>
    </div>
  );
}

export default QuoteCard;
