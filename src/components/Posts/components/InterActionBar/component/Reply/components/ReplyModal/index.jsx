import PostCard from "@/components/Posts";
import PostAvatar from "@/components/Posts/components/PostAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/features/auth/hooks";
import { resetFeed, updatePostReplies } from "@/features/posts/postSlice";
import { formData, reply } from "@/services/posts/interactionServicers";
import { getListPost } from "@/services/posts/postService";
import { Image, MoreHorizontal } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function ReplyModal({ post, onClose }) {
  const currentUser = useCurrentUser();
  const disPatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
      media: [],
    },
  });
  const handleAutoResize = useCallback((e) => {
    const el = e.target;
    el.style.height = "auto"; // reset trước
    el.style.height = `${el.scrollHeight}px`; // set theo nội dung
  }, []);
  const handle = async (data) => {
    try {
      //const dataValue = formData(data);
      const res = await reply(post.id, data);

      disPatch(
        updatePostReplies({
          postId: post.id,
          replies_count: post.replies_count + 1,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };
  return (
    <>
      <div className="w-full sm:w-[640px] max-h-screen overflow-y-auto">
        <PostCard post={post} isReply={true} />
      </div>
      <div className="grid grid-cols-[50px_1fr] grid-rows-[auto_auto_auto_auto] gap-2 px-4 py-3">
        <div className="row-start-1 col-start-1 ">
          <div className="flex flex-row flex-wrap items-center  relative">
            <div className="w-10 h-10 bg-amber-600 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={currentUser?.avatar_url}
                  alt={currentUser?.name}
                />
                <AvatarFallback>{currentUser?.username[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        {/* Username + timestamp + more button ở hàng 2 cột 2 */}
        <form encType="multipart/form-data" onSubmit={handleSubmit(handle)}>
          <div className="row-start-1 col-start-2 flex items-center gap-2 justify-between ">
            <div className="flex items-start flex-col gap min-w-0 w-full">
              <span className="font-semibold text-foreground truncate">
                {currentUser?.username}
              </span>

              <Textarea
                {...register("content")}
                name="content"
                type="text"
                onInput={handleAutoResize}
                placeholder={`Trả lời : ` + post.user.name}
                className="min-h-0 resize-none overflow-hidden border-none outline-none shadow-none"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="media">
              <Image />
            </label>
            <input id="media" type="file" className="hidden" name="media" />
          </div>
          <div className="col-start-2 row-start-3 flex justify-end mt-4">
            <Button className="bg-amber-100">Đăng</Button>
          </div>
        </form>
      </div>
    </>
  );
}
