import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import LikeAction from "./component/Like";
import { useCurrentUser } from "@/features/auth/hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "@/components/Modal";
import LoginModal from "@/components/LogInModal";

function InterActionBar({ post }) {
  const currentUser = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const onHandle = () => {
    if (!currentUser) {
      setIsOpen(true);
    }
  };
  return (
    <div className="row-start-5 col-start-2 grid grid-cols-4 gap-2 sm:w-[50%]">
      <div
        className="flex gap-2"
        onClick={() => {
          onHandle();
        }}
      >
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <LoginModal />
        </Modal>
        <div>
          <LikeAction post={post} />
        </div>
        <div>
          <LikeAction post={post} />
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <LoginModal />
          </Modal>
        </div>
        <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
          <Repeat2 className="w-5 h-5" />
          <span className="text-sm">{post.reposts_and_quotes_count}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1">
          <Send className="w-5 h-5" />
          <span className="text-sm">{post.reposts_and_quotes_count}</span>
        </button>
      </div>
    </div>
  );
}
export default InterActionBar;
