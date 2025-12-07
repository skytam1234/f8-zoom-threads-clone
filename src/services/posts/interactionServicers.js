import http from "@/utils/http";

export const likeOrDiskLikePost = async (id) => {
  const res = await http.post(`/api/posts/${id}/like`);
  return res.data;
};
