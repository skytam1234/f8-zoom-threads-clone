import { getListPost } from "@/services/posts/postService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchListPost = ({ limit, page }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("ád");
    dispatch(getListPost({ limit, page }));
  }, [dispatch, limit, page]);
};
export const useListPost = () => {
  const listPost = useSelector((state) => state.post.list);
  return listPost;
};
