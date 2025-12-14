import Modal from "@/components/Modal";
import PostCard from "@/components/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/features/auth/hooks";
import { addPostToFeed } from "@/features/posts/postSlice";
import { quote } from "@/services/posts/interactionServicers";
import { Image } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function QuotePost({ post, isOpen, onClose }) {
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
  const submit = async (data) => {
    try {
      const res = await quote(post.id, data);
      disPatch(addPostToFeed(res));
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="grid grid-cols-[50px_1fr] grid-rows-[auto_auto_auto_auto] gap-2 px-4 py-3 w-full sm:w-[640px]">
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
          <form encType="multipart/form-data" onSubmit={handleSubmit(submit)}>
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
                  placeholder={`Trả lời : ` + post?.user?.name}
                  className="min-h-0 resize-none overflow-hidden border-none shadow-none focus:outline-none focus:shadow-none focus:focus:border-transparent my-2"
                />
              </div>
            </div>

            <div className="row-start-4 col-start-2 max-h-screen overflow-y-auto border rounded-4xl">
              <PostCard post={post} />
            </div>
            <div className="row-start-5 col-start-2 flex justify-end pt-4">
              <Button>Đăng</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
