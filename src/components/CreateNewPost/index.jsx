import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AvatarImage } from "../ui/avatar";
import {
  MessageSquareText,
  MoreHorizontal,
  ChevronRight,
  Image,
  MapPinCheckInside,
  FileText,
  Menu,
  Gift,
  Smile,
  SlidersVertical,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { useCurrentUser, useFetchCurrentUser } from "@/features/auth/hooks";
import { useForm } from "react-hook-form";

function CreateNewPost() {
  const handleAutoResize = useCallback((e) => {
    const el = e.target;
    el.style.height = "auto"; // reset trước
    el.style.height = `${el.scrollHeight}px`; // set theo nội dung
  }, []);

  const currentUser = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
  });
  useFetchCurrentUser();

  return (
    <>
      <TooltipProvider>
        <div className="border rounded-md">
          <form className="space-y-4 p-4">
            <div className=" w-[640px] h-20 flex items-center justify-between p-4">
              <div className="p-2">Hủy</div>
              <div className="text-black flex-1 text-center size-10">
                Thread mới
              </div>
              <div className="p-2 flex items-center justify-between gap-4">
                <Tooltip>
                  <TooltipTrigger>
                    <MessageSquareText />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    align="start"
                    className="z-100 bg-white border text-black rounded-none ml-5"
                  >
                    <p>Bản nháp</p>
                  </TooltipContent>
                </Tooltip>

                <div>
                  <Tooltip>
                    <TooltipTrigger>
                      <MoreHorizontal />
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="start"
                      className="z-100 bg-white border text-black rounded-none ml-5"
                    >
                      <p>Xem thêm</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between p-4">
                <div className="flex flex-col w-10 items-center">
                  <div className="w-full rounded-full overflow-hidden">
                    <Avatar className="ring-2 ring-background w-full rounded-full">
                      <AvatarImage
                        src={
                          currentUser.avatar_url ||
                          "https://github.com/shadcn.png"
                        }
                        alt="username"
                      />
                    </Avatar>
                  </div>
                  <div className="border bg-layout-main rotate-1 w-1 h-[80%] flex-1 mt-2"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-start px-4 max-w-100">
                    <div className="whitespace-nowrap font-bold text-black ">
                      {currentUser.name}
                    </div>
                    <ChevronRight />
                    <Input
                      placeholder="Thêm chủ đề  mới"
                      className="border-none inline-block"
                    />
                  </div>
                  <div>
                    <Textarea
                      type="text"
                      onInput={handleAutoResize}
                      placeholder="Có gì mới?"
                      className="min-h-0 resize-none overflow-hidden border-none outline-none shadow-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Bản nháp</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Gift />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Thêm file gif</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Smile />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Biểu tượng cảm xúc</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <Menu />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Thêm cuộc thăm dò ý kiến</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <FileText />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Thêm văn bản</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <MapPinCheckInside />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="start"
                          className="z-100 bg-white border text-black rounded-none ml-5"
                        >
                          <p>Thêm vị trí</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="ml-6">
                <div className="w-5 rounded-full overflow-hidden">
                  <Avatar className="ring-2 ring-background w-full rounded-full">
                    <AvatarImage
                      src={
                        currentUser.avatar_url ||
                        "https://github.com/shadcn.png"
                      }
                      alt="username"
                    />
                  </Avatar>
                </div>
              </div>
              <Input
                placeholder="Thêm vào thread"
                className="border-none inline-block"
              />
            </div>
            <div className="flex items-center justify-between p-6">
              <div className="flex">
                <SlidersVertical />
                <span className="block">
                  Các lựa chọn để kiểm soát câu trả lời
                </span>
              </div>
              <Button className="bg-transparent border text-black">Đăng</Button>
            </div>
          </form>
        </div>
      </TooltipProvider>
    </>
  );
}
export default CreateNewPost;
