import { getListPost } from "@/services/posts/postService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchListPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListPost());
    }, [dispatch]);
};
export const useListPost = () => {
    const listPost = useSelector((state) => state.post.list);
    return listPost;
};
