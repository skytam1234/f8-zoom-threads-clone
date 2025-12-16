import Modal from "@/components/Modal";
import PostCard from "@/components/Posts";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function ModalEmbed({ post, isOpen, onClose }) {
    const ref = useRef(null);

    const handleDownload = () => {
        if (ref.current === null) return;

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "my-image.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error("Lỗi khi tạo ảnh:", err);
            });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div
                ref={ref}
                className="w-full sm:w-[640px] max-h-screen overflow-y-auto"
            >
                <PostCard post={post} />

                <div className="w-full flex justify-end">
                    <Button
                        onClick={() => {
                            handleDownload();
                        }}
                    >
                        Lưu ảnh
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
