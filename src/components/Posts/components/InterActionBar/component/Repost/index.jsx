import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { updatePostReposts } from "@/features/posts/postSlice";
import { repost } from "@/services/posts/interactionServicers";

import { Repeat2 } from "lucide-react";
import { useDispatch } from "react-redux";

function Repost({ post }) {
  const dispatch = useDispatch();
  const handle = async () => {
    try {
      const res = await repost(post.id);
      console.log(res);
      dispatch(
        updatePostReposts({
          postId: post?.id,
          reposts_and_quotes_count: res?.reposts_and_quotes_count,
          is_reposted_by_auth: res?.is_reposted,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DropdownMenuItem
        className="flex items-center justify-between"
        onSelect={() => {
          handle();
        }}
      >
        <span>Đăng lại</span>
        <Repeat2 />
      </DropdownMenuItem>
    </>
  );
}
export default Repost;
