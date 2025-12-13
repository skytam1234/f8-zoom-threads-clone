import http from "@/utils/http";

export const actionLike = async (id) => {
    const res = await http.post(`posts/${id}/like`);
    return res.data;
};
export const formData = (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.media && data.media.length > 0) {
        data.media.forEach((file) => {
            formData.append("media[]", file);
        });
    } else {
        formData.append("media[]", "");
    }

    formData.append("reply_permission", data.reply_permission || "");
    return formData;
};
export const reply = async (id, data) => {
    const response = await http.post(`posts/${id}/reply`, data);
    return response.data;
};
export const repost = async (id) => {
    const response = await http.post(`posts/${id}/repost`);
    return response.data;
};
export const quote = async (id, data) => {
    const response = await http.post(`posts/${id}/quote`, data);
    return response.data;
};
