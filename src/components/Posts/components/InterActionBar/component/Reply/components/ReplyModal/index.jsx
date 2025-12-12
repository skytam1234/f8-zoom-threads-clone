import PostCard from "@/components/Posts";
import PostAvatar from "@/components/Posts/components/PostAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/features/auth/hooks";
import { MoreHorizontal } from "lucide-react";

export default function ReplyModal({ post }) {
  const currentUser = useCurrentUser();
  return (
    <>
      <div className="max-w-[640px] max-h-screen overflow-y-auto">
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
        <form>
          <div className="row-start-1 col-start-2 flex items-center gap-2 justify-between ">
            <div className="flex items-start flex-col gap min-w-0 w-full">
              <span className="font-semibold text-foreground truncate">
                {currentUser?.username}
              </span>

              <Input
                type=""
                placeholder={"Trả lời " + post.user.name}
                className="border-none shadow-none w-full "
              />
            </div>
          </div>
          <div className="col-start-2 row-start-3 flex justify-end mt-4">
            <Button>Đăng</Button>
          </div>
        </form>
      </div>
    </>
  );
}
