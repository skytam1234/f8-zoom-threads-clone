import Modal from "@/components/Modal";
import PostCard from "@/components/Posts";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

import copy from "copy-to-clipboard";
export default function EmbedModal({ post, isOpen, onClose }) {
    const ref = useRef(null);
    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/#/${post?.user?.username}/post/${post?.id}/embed`;

    const embedCode = `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0" allowtransparency="true"></iframe>`;
    const handleCopy = () => {
        copy(embedCode);
        alert("Đã copy vào clipboard!");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div
                ref={ref}
                className="w-full sm:w-[640px] max-h-screen overflow-y-auto"
            >
                <PostCard post={post} />

                <div className="w-full flex items-center bg-gray-200 rounded-2xl gap-4 justify-end p-4">
                    <div className="flex-1 overflow-hidden">{embedCode}</div>
                    <Button
                        className="w-30"
                        onClick={() => {
                            handleCopy();
                        }}
                    >
                        Sao chép
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
