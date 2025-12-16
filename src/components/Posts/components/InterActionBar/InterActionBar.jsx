import {
    Repeat2,
    Send,
    DoorOpen,
    MessageSquareQuote,
    SendIcon,
    Link2,
    Braces,
    Image,
} from "lucide-react";
import LikeAction from "./component/Like";
import { useCurrentUser } from "@/features/auth/hooks";
import { useState } from "react";

import Modal from "@/components/Modal";
import LoginModal from "@/components/LogInModal";
import Reply from "./component/Reply";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Repost from "./component/Repost";
import QuotePost from "./component/QuotePost";
import copy from "copy-to-clipboard";
import { baseURL } from "@/utils/http";
import ModalEmbed from "./component/ModalEmbed";
import EmbedModal from "../EmbedModal";

function InterActionBar({ post }) {
    const currentUser = useCurrentUser();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenQ, setIsOpenQ] = useState(false);
    const [isOpenModalE, setIsOpenModalE] = useState(false);
    const [isOpenEmbed, setIsOpenEmbed] = useState(false);
    const handleCopy = () => {
        const link = baseURL + "posts/" + post.id;
        copy(link);
        alert("Đã copy vào clipboard!");
    };

    const onHandle = () => {
        if (!currentUser) {
            setIsOpen(true);
        }
    };
    return (
        <div className="row-start-5 col-start-2  ">
            <div className="flex items-center ">
                <div
                    className="flex gap-2"
                    onClick={() => {
                        onHandle();
                    }}
                >
                    <QuotePost
                        post={post}
                        isOpen={isOpenQ}
                        onClose={() => {
                            setIsOpenQ(false);
                        }}
                    />
                    <Modal
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                        }}
                    >
                        <LoginModal />
                    </Modal>
                    <ModalEmbed
                        isOpen={isOpenModalE}
                        post={post}
                        onClose={() => {
                            setIsOpenModalE(false);
                        }}
                    />
                    <EmbedModal
                        post={post}
                        isOpen={isOpenEmbed}
                        onClose={() => {
                            setIsOpenEmbed(false);
                        }}
                    />

                    <div>
                        <LikeAction post={post} />
                    </div>
                    <div>
                        <Reply post={post} />
                    </div>

                    <div className="flex flex-col  items-center  ">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground !p-0 bg-white  hover:bg-white">
                                    <Repeat2 className="!w-6 !h-6" />
                                    <span className="">
                                        {post.reposts_and_quotes_count}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56 z-100 ml"
                                align="start"
                            >
                                <div>
                                    <Repost post={post} />

                                    <DropdownMenuItem
                                        className="flex items-center justify-between"
                                        onSelect={() => {
                                            setIsOpenQ(true);
                                        }}
                                    >
                                        <span>Trích dẫn</span>
                                        <MessageSquareQuote />
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex flex-col  items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground !p-0 bg-white  hover:bg-white">
                                    <SendIcon className="!w-4 !h-4" />
                                    {/* <span className="">{post.reposts_and_quotes_count}</span> */}
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56 z-100 ml"
                                align="start"
                            >
                                <div>
                                    <DropdownMenuItem
                                        className="flex items-center justify-between hover:bg-gray-300  rounded-2xl"
                                        onSelect={() => {
                                            handleCopy();
                                        }}
                                    >
                                        <span>Sao chép liên kết</span>
                                        <Link2 />
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="flex items-center justify-between"
                                        onSelect={() => {
                                            setIsOpenModalE(true);
                                        }}
                                    >
                                        <span>Sao chép dưới dạng hình ảnh</span>
                                        <Image />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="flex items-center justify-between"
                                        onClick={() => {
                                            setIsOpenEmbed(true);
                                        }}
                                    >
                                        <span>Lấy mã nhúng</span>
                                        <Braces />
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InterActionBar;
