import axios from "axios";

//const baseURL = import.meta.env.VITE_BASE_API;
const baseURL = "https://threads.f8team.dev";

export const httpClient = axios.create({
    baseURL,
});

httpClient.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token");
    console.log("ac-tk", access_token);
    if (access_token) {
        config.headers.set("Authorization", `Bearer ${access_token}`);
    }
    return config;
});

// ============================================
// PHẦN 3: XỬ LÝ LÀM MỚI TOKEN TỰ ĐỘNG
// ============================================

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

const refreshToken = async () => {
    try {
        const result = await axios.post(`${baseURL}/api/auth/refresh`, {
            refresh_token: localStorage.getItem("refresh_token"),
        });

        localStorage.setItem("access_token", result.data.data.access_token);
        localStorage.setItem("refresh_token", result.data.data.refresh_token);

        processQueue(null);
    } catch (error) {
        processQueue(error);
        throw error;
    }
};

const getNewToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;
        await refreshToken();
        isRefreshing = false;
    }

    return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
    });
};

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const shouldRenewToken =
            error.response.status === 401 && !originalRequest._retry;

        if (shouldRenewToken) {
            originalRequest._retry = true;

            try {
                await getNewToken();
                console.log("đã reset");
                return httpClient(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

// ============================================
// PHẦN 5: CÁC HÀM TIỆN ÍCH ĐỂ GỌI API
// ============================================

// Hàm nội bộ dùng chung để gửi request
// Không export ra ngoài vì chỉ dùng trong file này
const _send = async (method, path, data, config) => {
    // Gọi API với đầy đủ thông tin
    const response = await httpClient.request({
        ...config, // Các config tùy chỉnh (nếu có)
        method, // GET, POST, PUT, PATCH, DELETE
        url: path, // Đường dẫn API (ví dụ: /users)
        data, // Dữ liệu gửi đi (với POST, PUT, PATCH)
    });

    // Chỉ trả về phần data, bỏ qua headers và thông tin khác
    return response.data;
};

// Hàm GET: lấy dữ liệu từ server
// Ví dụ: get('/users') -> lấy danh sách users
const get = async (path, config) => {
    return await _send("get", path, null, config);
    // null vì GET không gửi data trong body
};

// Hàm POST: tạo mới dữ liệu
// Ví dụ: post('/users', { name: 'John' }) -> tạo user mới
const post = async (path, data, config) => {
    return await _send("post", path, data, config);
};

// Hàm PUT: cập nhật toàn bộ dữ liệu
// Ví dụ: put('/users/1', { name: 'John', age: 30 }) -> cập nhật user id=1
const put = async (path, data, config) => {
    return await _send("put", path, data, config);
};

// Hàm PATCH: cập nhật một phần dữ liệu
// Ví dụ: patch('/users/1', { age: 31 }) -> chỉ cập nhật tuổi
const patch = async (path, data, config) => {
    return await _send("patch", path, data, config);
};

// Hàm DELETE: xóa dữ liệu
// Ví dụ: del('/users/1') -> xóa user id=1
const del = async (path, config) => {
    return await _send("delete", path, null, config);
    // null vì DELETE không gửi data trong body
};

// Export object chứa tất cả các hàm để sử dụng ở các file khác
const http = { get, post, put, patch, del };

export default http;
