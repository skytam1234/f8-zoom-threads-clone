import { object, string } from "yup";

const loginSchema = object({
    login: string().required("Tên đăng nhập không được bỏ trống").min(8),
    password: string(),
});
export default loginSchema;
