import { object, string, ref } from "yup";

const registerSchema = object({
  username: string()
    .required("Tên đăng nhập không được bỏ trống")
    .min(8, "Tên đăng nhập ít nhất 8 ký tự!"),
  email: string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  password: string()
    .required("Mật khẩu không được bỏ trống")
    .min(8, "Mật khẩu ít nhất 8 ký tự!"),
  password_confirmation: string()
    .required("Xác nhận mật khẩu không được bỏ trống")
    .oneOf([ref("password")], "Mật khẩu xác nhận không khớp"),
});
export default registerSchema;
