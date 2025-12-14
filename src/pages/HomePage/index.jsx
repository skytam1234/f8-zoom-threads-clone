import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useFetchListPost, useListPost } from "@/features/posts/hooks";
import PostCard from "@/components/Posts";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { postSlice } from "@/features/posts/postSlice";
import { useCurrentUser } from "@/features/auth/hooks";
import Modal from "@/components/Modal";
import CreateNewPost from "@/components/CreateNewPost";
function HomePage() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postSlice.actions.resetFeed());
  }, [dispatch]);
  const currentUser = useCurrentUser();
  useFetchListPost({ limit: 20, page });
  const listPost = useListPost();
  const loading = useSelector((state) => state[postSlice.reducerPath].loading);
  const lastPage = useSelector(
    (state) => state[postSlice.reducerPath].pagination.last_page
  );
  const hasMore = lastPage === 0 || page < lastPage;

  const fetchMoreData = () => {
    if (loading) return;
    if (lastPage > 0 && page < lastPage) setPage((pre) => pre + 1);
  };

  // Mock data - sau này sẽ lấy từ API

  return (
    <div className=" w-full border">
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <CreateNewPost />
      </Modal>
      <div className="fixed hidden left-1/2 -translate-x-1/2 top-8 w-full z-20  items-center justify-center bg-layout-background  pointer-events-none sm:flex">
        <div className="font-semibold pointer-events-auto">Trang chủ</div>
      </div>
      {/* Create Post Section */}
      {currentUser && (
        <div
          className="hidden md:block  border-b "
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className="flex items-start gap-3 p-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser?.avatar_url}
                alt={currentUser?.username}
              />
              <AvatarFallback>{currentUser?.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1  bg-transparent border-none outline-none shadow-none text-base text-gray-400">
                Có gì mới?
              </div>

              <Button className=" bg-transparent text-foreground border   px-6">
                Đăng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List với InfiniteScroll */}
      <InfiniteScroll
        dataLength={listPost.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4 text-gray-500">Đang tải...</div>
        }
        endMessage={
          <div className="text-center py-4 text-gray-500">
            <p>Đã hết bài viết</p>
          </div>
        }
        scrollThreshold={0.8} // Trigger khi còn 80% để đến cuối
      >
        <div className="w-full divide-y divide-border">
          {listPost.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default HomePage;
