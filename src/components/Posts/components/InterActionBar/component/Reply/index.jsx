import Modal from "@/components/Modal";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";
import ReplyModal from "./components/ReplyModal";

function Reply({ post }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="max-w-[640px]">
                <button
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1"
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    <MessageCircleMore className="w-5 h-5" />
                    <span className="text-sm">{post.replies_count}</span>
                </button>

                <Modal
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                >
                    <ReplyModal
                        post={post}
                        onClose={() => {
                            setIsOpen(false);
                        }}
                    />
                </Modal>
            </div>
        </>
    );
}
export default Reply;
