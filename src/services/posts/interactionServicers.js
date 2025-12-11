import http from "@/utils/http";

export const actionLike = async (id) => {
    const res = await http.post(`posts/${id}/like`);
    return res.data;
};
