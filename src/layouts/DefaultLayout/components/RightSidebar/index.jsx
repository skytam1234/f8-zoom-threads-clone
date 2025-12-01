import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";
import { Plus } from "lucide-react";

function RightSidebar() {
  const currentUser = useCurrentUser();

  if (currentUser) return null;
  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-between items-end w-80 p-6 mt-8 fixed right-0 top-0 h-screen overflow-y-auto z-63">
      <div className="sticky top-6">
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Đăng nhập hoặc đăng ký Threads
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Xem mọi người đang nói về điều gì và tham gia cuộc trò chuyện.
          </p>

          <Button
            variant="outline"
            className="w-full border-foreground/20 hover:bg-accent mb-4 h-10"
          >
            <div className="flex items-center justify-center gap-2">
              {/* Instagram icon placeholder */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-medium">Tiếp tục bằng Instagram</span>
            </div>
          </Button>

          <button className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
            Đăng nhập bằng tên người dùng
          </button>
        </div>
      </div>
      <div className="hidden lg:flex px-2 py-1 mb-10 lg:items-center lg:justify-center bg-transparent border z-62 hover:scale-105 shadow-2xl rounded-md">
        <Plus className="w-16 h-14 p-2 text-foreground" strokeWidth={3} />
      </div>
    </div>
  );
}
export default RightSidebar;
